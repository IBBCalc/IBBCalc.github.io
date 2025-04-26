var storagename = 'breakpoints';
var tablename = '#table_breakpoints';
var data = GetItem(storagename, defaultbreakpoints);
var settings = GetItem("settings", defaultsettings);
UpgradeSettingScripts(settings, "settings");

function GetItem(key, obj) {	
	try {
		var json = window.localStorage.getItem(key);
		if (json === undefined || json === null) {
			StoreItem(key, obj);
		}
		else {
			obj = JSON.parse(json);
		}
	
		console.log(obj);
		return obj;
	}
	catch (e) {
		if (e.name === "NS_ERROR_FILE_CORRUPTED") {
			alert("Somehow your local storage file got corrupted. You will have to manually clear this.")
			return obj;
		}
	}
}

function StoreItem(key, obj) {
	window.localStorage.setItem(key, JSON.stringify(obj));
}

// %%%%%%%%%%%%%%%%%%%%%%% Get Data methods %%%%%%%%%%%%%%%%%%%%%%%

function GetKeyValue(data, key, def) {
	var entry = data.find(d => d.key.localeCompare(key, undefined, { sensitivity: 'accent' }) === 0);
	if (entry === undefined) {
		return def;
	}
	
	if (entry.value === null) {
		return def;
	}
	
	return entry.value;
}

function GetKeyValueIfActive(data, key, def) {
	var entry = data.find(d => d.key.localeCompare(key, undefined, { sensitivity: 'accent' }) === 0);
	if (entry === undefined) {
		return def;
	}
	
	if (entry.active) {
		return entry.value;
	}
	
	return def;
}

function GetObjKeyValueIfActive(data, key, objkey, valkey, def) {
	var entry = data.find(d => d.key.localeCompare(key, undefined, { sensitivity: 'accent' }) === 0);
	if (entry === undefined) {
		return def;
	}
	
	if (entry.active) {
		var level = entry[objkey].level;
		var value = entry[objkey][valkey][level];
		if (value != null) {
			return value;
		}
	}
	
	return def;
}

function GetKeyActive(data, key, iftrue, iffalse) {
	var entry = data.find(d => d.key.localeCompare(key, undefined, { sensitivity: 'accent' }) === 0);
	if (entry === undefined) {
		return iffalse;
	}
	
	if (entry.active) {
		return iftrue;
	}
	
	return iffalse;
}

// %%%%%%%%%%%%%%%%%%%%%%% Update Data methods %%%%%%%%%%%%%%%%%%%%%%%

function UpdateNumber(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		data[r][Object.keys(data[r])[c]] = e.target.value === '' ? null : parseFloat(e.target.value);
		console.log('Row changed: ', data[r])
		StoreItem(storagename, data);
	}
}
function UpdateText(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		data[r][Object.keys(data[r])[c]] = e.target.value === 'null' ? null : e.target.value;
		console.log('Row changed: ', data[r])
		StoreItem(storagename, data);
	}
}

function UpdateCheckbox(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		data[r][Object.keys(data[r])[c]] = !data[r][Object.keys(data[r])[c]];
		console.log('Row changed: ', data[r])
		StoreItem(storagename, data);
	}
}

function UpdateFooter() {	
	$('#tfoot_badges').html(settings.badges.reduce(function (a, b) { 
		return a + parseInt(b["value"]);
	}, 0));
}

// %%%%%%%%%%%%%%%%%%%%%%% Created Cell Templates %%%%%%%%%%%%%%%%%%%%%%%

function RefreshDataCells() {
	var datacells = [6,7,8,9,10,11,12];
	$(tablename).DataTable().cells(null, datacells).invalidate();
}

function RefreshRows() {
	$(tablename).DataTable().rows().invalidate();
}

function RefreshHits() {
	$('#table_breakpoints_ball').DataTable().rows().invalidate();
	$('#table_breakpoints_effect').DataTable().rows().invalidate();
}

function CreatedNumberTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateNumber(data, e);
			RefreshDataCells();
			RefreshHits();
		});
	}
}

function CreatedCheckboxTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateCheckbox(data, e);
			RefreshDataCells();
			RefreshHits();
		});
	}
}

function CreatedDropdownTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {			
			UpdateText(data, e);
			RefreshRows();
			RefreshHits();
		});
	}
}

// %%%%%%%%%%%%%%%%%%%%%%% Column Templates %%%%%%%%%%%%%%%%%%%%%%%

function ColumnNumberTemplate(data, title, width) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) { 
			if (data === undefined) {
				return '';
			}

			if ( type === 'display' ) {
				return '<input type="number" step="' + row.step + '" value="' + data + '">';
			}
			return data;
		},  
	};
}

function ColumnCheckboxTemplate(data, title, width) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {
			if ( type === 'display' ) {
				// No ball selected
				if (row.type === null || row.type === 'null') {
					row.ballspec = false;
					row.friend = false;
					row.enrage = false;
					return '';
				}
				
				// Ball Spec not active
				if (meta.col === 6 && GetKeyActive(settings.cards, 'Ball Spec.')) {
					row.ballspec = false;
					return '';
				}
				
				// Friend Bonus not unlocked
				if (meta.col === 7 && GetKeyValue(settings.skills.basic, 'Friend Bonus') === undefined) {
					row.friend = false;
					return '';
				}
				
				// No poison or demo selected. Or they are selected, but their relative Enrage is not unlocked.
				if (meta.col === 8 
					&& !((row.type === 'poison' && GetKeyValue(settings.skills.poison, 'Enrage') !== undefined)
					|| (row.type === 'demo' && GetKeyValue(settings.skills.demo, 'Enrage') !== undefined))) {
					row.enrage = false;
					return '';
				}
				
				if (data === undefined) {
					return '';
				}

				if(data) {
					return '<input type="checkbox" checked>';
				} else {
					return '<input type="checkbox">';
				}
			}
			return data;
		}, 
	};
}

function ColumnDropdownTemplate(data, title, width) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {
			if (data === undefined) {
				return '';
			}

			if ( type === 'display' ) { 
				switch (title) {
					case 'Ball Type':
						if (meta.row === 0) {
							var isselected = row.type === 'poison' ? 'selected="selected"' : '';
							return '<select><option value=null></option><option value="poison" ' + isselected + '>Poison</option></select>';
						}
						
						var select = '<select>';
						select += '<option value=null></option>'
						available[null].forEach(balltype => {
							if (balltype !== 'poison' && balltype !== 'cash' ) {
								var isselected = row.type === balltype ? 'selected="selected"' : '';
								var balltypetext = balltype.charAt(0).toUpperCase() + balltype.slice(1);
								select += '<option value="' + balltype + '" ' + isselected + '>' + balltypetext + '</option>';
							}
						});
						select += '</select>'
						return select;
					case 'Slot':
						var select = '<select>';
						select += '<option value=null></option>'
						slots.forEach(slot => {
							var isselected = row.slot === slot ? 'selected="selected"' : '';
							select += '<option value="' + slot + '" ' + isselected + '>' + slot + '</option>';
						});
						select += '</select>'
						return select;
				}
			}
			return data;
		}, 
	};
}

function ColumnFuncTemplate(func, title, width, format) {
	return { 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {			
			var value = func(row, meta.row);
			if ( type === 'display' ) {
				if (value === null) {
					return '';
				}
				
				if (format) {
					return FormatNumber(value);					
				}
			}
			return value;
		}, 
	};
}

// %%%%%%%%%%%%%%%%%%%%%%% Build Page %%%%%%%%%%%%%%%%%%%%%%%

function BuildPage() {
	try {
		BuildPageWithErrorLog();
	} catch (e) {
		alert(e.stack);
	}
}

function BuildPageWithErrorLog() {
	$(document).ready(function() {
		$("input[type=number]").focus().select();
	});
	
	BuildTable();
}

function BuildTable() {
	$(tablename).DataTable({
		data: data,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: [1, 2],
			createdCell: CreatedDropdownTemplate(data)
		},{ 
			targets: [3, 4, 5],
			createdCell: CreatedNumberTemplate(data)
		},{ 
			targets: [6, 7, 8],
			createdCell: CreatedCheckboxTemplate(data)
		}],
		columns: [
			{ data: 'source', title: "Source", width: '35px' },
			ColumnDropdownTemplate('type', 'Slot', '50px'),
			ColumnDropdownTemplate('type', 'Ball Type', '100px'),
			ColumnNumberTemplate('amount', 'Nr. Balls', '40px'),
			ColumnNumberTemplate('speedlvl', 'Ball Speed', '40px'),
			ColumnNumberTemplate('powerlvl', 'Ball Power', '40px'),
			ColumnCheckboxTemplate('ballspec', 'Ball Spec.', '30px'),
			ColumnCheckboxTemplate('friend', 'Friend Bonus', '30px'),
			ColumnCheckboxTemplate('enrage', 'Enrage', '30px'),
			ColumnFuncTemplate(CalculateSpeed, 'Speed', '55px', true),
			ColumnFuncTemplate(CalculatePower, 'Power', '55px', true),
			ColumnFuncTemplate(CalculateCost, 'Cost', '55px', true),
			ColumnFuncTemplate(CalculateRowDamage, 'Damage', '55px', true),
		]
	});
	
	var ballhits = [
		{
			"hits": 1
		},
		{
			"hits": 2
		},
		{
			"hits": 3
		},
		{
			"hits": 4
		},
		{
			"hits": 5
		},
		{
			"hits": 6
		},
		{
			"hits": 7
		},
		{
			"hits": 8
		},
		{
			"hits": 9
		},
		{
			"hits": 10
		}
	];
	$('#table_breakpoints_ball').DataTable({
		data: ballhits,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columns: [
			{ data: 'hits', title: "Hits Needed", width: '35px' },
			ColumnFuncTemplate(CalculateHitsGreen, 'Green', '55px', true),
			ColumnFuncTemplate(CalculateHitsBlue, 'Blue', '55px', true),
			ColumnFuncTemplate(CalculateHitsHex, 'Hex', '55px', true),
			ColumnFuncTemplate(CalculateHitsBlueShield, 'Blue Shield', '55px', true),
			ColumnFuncTemplate(CalculateHitsHexShield, 'Hex Shield', '55px', true),
		]
	});
	
	$('#table_breakpoints_effect').DataTable({
		data: ballhits,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columns: [
			{ data: 'hits', title: "Hits Needed", width: '35px' },
			ColumnFuncTemplate(CalculateHitsGreenEffect, 'Green', '55px', true),
			ColumnFuncTemplate(CalculateHitsBlueEffect, 'Blue', '55px', true),
			ColumnFuncTemplate(CalculateHitsHexEffect, 'Hex', '55px', true),
			ColumnFuncTemplate(CalculateHitsBlueShieldEffect, 'Blue Shield', '55px', true),
			ColumnFuncTemplate(CalculateHitsHexShieldEffect, 'Hex Shield', '55px', true),
		]
	});
	
	BuildSettingsTable();	
}

// %%%%%%%%%%%%%%%%%%%%%%% Calculations %%%%%%%%%%%%%%%%%%%%%%%

function CalculateSpeed(row) {
	if (row === undefined || row.slot === null || row.type === null) {
		return null;
	}
	
	if (!available[row.slot].includes(row.type) || !availableslots[row.type].includes(row.slot)) {
		return null;
	}
	
	var increment = speedbasestats[row.type].increment;
	var modifier = speedbasestats[row.type].modifier;
	var basestat = basestats[row.slot][row.type].speed;
	var speedLevel = row.speedlvl

	var speedBase = (increment * speedLevel * (Math.pow(modifier, speedLevel))) + basestat;
	var speed = (speedBase
		* GetKeyValue(settings.prestige, 'Ball Speed', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Ball Speed', 'card', 'value1', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Quality Control', 'card', 'value1', 1)
		* GetKeyValue(settings.perks, 'Ball Speed', 1)
		* ((speedLevel > 40) ? 0.4 : 1)
		* ((speedLevel > 80) ? 0.4 : 1)
		* GetKeyValue(settings.skills[row.type], 'Speed', 1)
		* ((row.enrage) ? GetKeyValue(settings.skills[row.type], 'Enrage', 1) : 1)
		* ((row.enrage) ? GetKeyActive(settings.skills[row.type], 'Enrage Stack', 3, 1) : 1));
	return speed;
}

function CalculatePower(row) {
	if (row === undefined || row.slot === null || row.type === null) {
		return null;
	}
	
	if (!available[row.slot].includes(row.type) || !availableslots[row.type].includes(row.slot)) {
		return null;
	}
	
	var increment = powerbasestats[row.type].increment;
	var modifier = powerbasestats[row.type].modifier;
	var basestat = basestats[row.slot][row.type].power;
	var speedLevel = row.speedlvl
	var powerLevel = row.powerlvl

	var powerBase = (1
		+ (increment * powerLevel * (Math.pow(modifier, powerLevel)))
		+ ((row.type === "poison" || row.type === "cash") ? basestat - 1 : 0))
		* ((row.type !== "poison" && row.type !== "cash") ? basestat : 1);
	var power = (powerBase
		* GetKeyValue(settings.prestige, 'Ball Power', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Ball Speed', 'card', 'value2', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Ball Speed', 'mastery', 'value', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Ball Power', 'card', 'value1', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Ball Power', 'mastery', 'value', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Quality Control', 'card', 'value2', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Quality Control', 'mastery', 'value', 1)
		* ((row.ballspec) ? GetObjKeyValueIfActive(settings.cards, 'Ball Spec.', 'card', 'value1', 1) : 1)
		* ((row.ballspec) ? GetObjKeyValueIfActive(settings.cards, 'Ball Spec.', 'mastery', 'value', 1) : 1)
		* GetObjKeyValueIfActive(settings.cards, 'Rage Battery', 'card', 'value1', 1)
		* GetKeyValue(settings.perks, 'Ball Power', 1)
		* GetKeyActive(settings.boosts, 'Power Hungry', 3, 1)
		* ((speedLevel > 40) ? 5 : 1)
		* ((speedLevel > 80) ? 5 : 1)
		* (1 + (GetKeyValue(settings.badges, row.type, 0) * 0.2))
		* GetKeyValue(settings.skills[row.type], 'Damage', 1)
		* GetKeyValue(settings.skills[row.type], 'Power', 1) // cash
		* ((row.friend) ? GetKeyValue(settings.skills.basic, 'Friend Bonus', 1) : 1)
		* ((row.enrage) ? GetKeyValue(settings.skills[row.type], 'Enrage Fight', 1) : 1)
		* ((row.enrage) ? Math.pow(GetKeyValue(settings.skills[row.type], 'Cumulative Strength', 1), 3) : 1))
		* GetKeyValue(settings.powermap, row.type, 1);
	return power;
}

function CalculateCost(row) {
	if (row === undefined || row.slot === null || row.type === null) {
		return null;
	}
	
	if (!available[row.slot].includes(row.type) || !availableslots[row.type].includes(row.slot)) {
		return null;
	}
	
	var amountLevel = row.amount
	var speedLevel = row.speedlvl
	var powerLevel = row.powerlvl

	var ballcostmod = (1 + (GetKeyValue(settings.prestige, 'New Ball Cost', 1) / 100)) * (1 + (GetKeyValue(settings.perks, 'New Ball Cost', 1) / 100));
	var speedcostmod = (1 + (GetKeyValue(settings.prestige, 'Ball Speed Cost', 1) / 100)) * (1 + (GetKeyValue(settings.perks, 'Ball Speed Cost', 1) / 100));
	var powercostmod = (1 + (GetKeyValue(settings.prestige, 'Ball Power Cost', 1) / 100)) * (1 + (GetKeyValue(settings.perks, 'Ball Power Cost', 1) / 100));

	var sumballcost = 0;
	for (var i = 0; i < amountLevel; i++) {
		sumballcost += basecosts[row.slot].ball * Math.pow(1.9, i)
	}

	var sumspeedcost = 0;
	for (var i = 0; i < speedLevel; i++) {
		sumspeedcost += basecosts[row.slot].speed * Math.pow(1.9, i)
	}

	var sumpowercost = 0;
	for (var i = 0; i < powerLevel; i++) {
		sumpowercost += basecosts[row.slot].power * Math.pow(1.9, i)
	}

	var buycost = basecosts[row.slot].buy;
	var ballcost = ((amountLevel > 0) ? sumballcost * ballcostmod : 0);
	var speedcost = ((speedLevel > 0) ? sumspeedcost * speedcostmod : 0);
	var powercost = ((powerLevel > 0) ? sumpowercost * powercostmod : 0);
	var prestige1cost = ((speedLevel > 40) ? basecosts[row.slot].speed * Math.pow(1.9, 38) * 9.49 : 0) * speedcostmod;
	var prestige2cost = ((speedLevel > 80) ? basecosts[row.slot].speed * Math.pow(1.9, 78) * 9.49 : 0) * speedcostmod;
	var cost = buycost + ballcost + speedcost + powercost + prestige1cost + prestige2cost;
	return cost;
}

function CalculateHitsGreen(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage();
	return CalculateLastBrickLevel(damage * row.hits)
}

function CalculateHitsBlue(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage();
	if (data[1].type.localeCompare('proportional', undefined) === 0) {
		damage *= 2 * GetKeyValue(settings.skills[data[1].type], 'Blue Bricks Damage', 1);
	}

	return CalculateLastBrickLevel(damage * row.hits / 2)
}

function CalculateHitsHex(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage();
	if (data[1].type.localeCompare('proportional', undefined) === 0) {
		damage *= 25;
	}

	return CalculateLastBrickLevel(damage * row.hits / 25)
}

function CalculateHitsBlueShield(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage();
	if (data[1].type.localeCompare('proportional', undefined) === 0) {
		damage *= 2 * GetKeyValue(settings.skills[data[1].type], 'Blue Bricks Damage', 1);
	}

	var shieldmod = CalculateShieldModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 2 / shieldmod)
}

function CalculateHitsHexShield(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage();
	if (data[1].type.localeCompare('proportional', undefined) === 0) {
		damage *= 25;
	}

	var shieldmod = CalculateShieldModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 25 / shieldmod)
}

function CalculateEffectModifier(balltype) {
	switch (balltype) {
		case 'basic':
			return GetKeyActive(settings.skills.basic, 'Splash Size', 0.4, 0)
				* (1 + GetObjKeyValueIfActive(settings.cards, 'Splash Damage', 'card', 'value1', 0) / 100)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Damage', 'mastery', 'value', 1)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Radius', 'card', 'value1', 1)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Radius', 'mastery', 'value', 1);
		case 'splash':
			return 0.4 
				* (1 + GetObjKeyValueIfActive(settings.cards, 'Splash Damage', 'card', 'value1', 0) / 100)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Damage', 'mastery', 'value', 1)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Radius', 'card', 'value1', 1)
				* GetObjKeyValueIfActive(settings.cards, 'Splash Radius', 'mastery', 'value', 1);
		case 'sniper':
			return GetKeyValue(settings.skills.sniper, 'Archer Sniper', null)
		case 'poison':
		case 'demo':
		case 'cash':
		case 'pierce':
		case 'sword':
			return null;
		case 'scatter':
			var split = GetKeyValue(settings.skills.scatter, 'Split', 2);
			var fly = GetKeyValue(settings.skills.scatter, 'Fly Children!', 0.4);
			var merge = GetKeyActive(settings.skills.scatter, 'Scatter Merge', true, false);
			if (merge) {
				return fly * split;
			}
			return fly;
		case 'fire':
			return null;
		case 'lightning':
			return 0.3;
		case 'proportional':
			return null;
	}
}

function CalculateHitsGreenEffect(row, rowindex) {
	if (row === undefined || data === undefined) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	var effectmod = CalculateEffectModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits * effectmod)
}

function CalculateHitsBlueEffect(row, rowindex) {
	if (row === undefined || data === undefined) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	var effectmod = CalculateEffectModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 2 * effectmod)
}

function CalculateHitsHexEffect(row, rowindex) {
	if (row === undefined || data === undefined) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	var effectmod = CalculateEffectModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 25 * effectmod)
}

function CalculateHitsBlueShieldEffect(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	var effectmod = CalculateEffectModifier(data[1].type);
	var shieldmod = CalculateShieldModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 2 / shieldmod * effectmod)
}

function CalculateHitsHexShieldEffect(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	var effectmod = CalculateEffectModifier(data[1].type);
	var shieldmod = CalculateShieldModifier(data[1].type);
	return CalculateLastBrickLevel(damage * row.hits / 25 / shieldmod * effectmod)
}

function CalculateRowDamage(row, rowindex) {
	if (row === undefined || data === undefined || data[1].type === null || row.type == null || row.type.localeCompare('poison', undefined) === 0) {
		return null;
	}
	
	var damage = CalculateDamage(data[1].type);
	return damage;
}

function CalculateDamage(balltype) {
	var poisonpower = $(tablename).DataTable().cell(0, 10).render('a');
	if (poisonpower == null || poisonpower === '') {
		poisonpower = 1;
	}
	
	var ballpower = $(tablename).DataTable().cell(1, 10).render('a')
		* ((balltype === 'basic') ? GetKeyActive(settings.skills.basic, 'Splash Size', 1.4, 1) : 1)
		* ((balltype === 'splash') ? 1.4 : 1);
	if (ballpower == null) {
		return null;
	}
	
	return ballpower
		* poisonpower
		* GetObjKeyValueIfActive(settings.cards, 'Catalyst', 'card', 'value1', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Catalyst', 'mastery', 'value', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Noxious Fumes', 'mastery', 'value', 1);
}

function CalculateShieldModifier(balltype) {
	var shieldmod = 500
		/ GetObjKeyValueIfActive(settings.cards, 'Shield Pen.', 'card', 'value1', 1) 
		/ GetObjKeyValueIfActive(settings.cards, 'Shield Pen.', 'mastery', 'value', 1);
	if (balltype.localeCompare('sword', undefined) === 0) {
		shieldmod = 1;
	}
	else if (balltype.localeCompare('sniper', undefined) === 0) {
		var snipermod = GetKeyValue(settings.skills.sniper, 'Shield Damage', 1)
		shieldmod = shieldmod / snipermod;
	}
		
	return shieldmod;
}

function CalculateLastBrickLevel(balldamage) {
	// Find first brick level where balldamage < brick health
	var nexthealthjump = null;
	for (var i in brickmult) {
		var health = Math.pow(brickmult[i].level, 1.32) * brickmult[i].cumulative;
		if (balldamage < health) {
			nexthealthjump = i;
			break;
		}
	}
	
	// If none found -> over 200k
	if (nexthealthjump === null) {
		var cumulative = brickmult[brickmult.length - 1].cumulative;
		var level = brickmult[brickmult.length - 1].level;

		var increment = 1e4;		
		do {
			level += increment;
			var extraMult = 1;
			if (level >= 300000) {
				var jumps = (level - 200000) / 100000;
				var extraMult = Math.pow(1.4, jumps);
		
				// Not sure about this, this was what dev explained, not what is definitely in the code
				// Though this only happens after stage 130m ish, so not super relevant anyway
				if (extraMult == Infinity || extraMult > 9e201) {
					extraMult = 9e201;
				}
			}

			var basehealth = Math.pow(level, 1.32) * cumulative;
			var health = basehealth * extraMult;
		}
		while (balldamage >= health);

		return level - increment;
	}
	
	// If 0, damage is 0
	if (nexthealthjump === "0") {
		return 0;
	}
	
	// Check if balldamage > previous brick health
	var previoushealth = Math.pow(brickmult[nexthealthjump].level - 1, 1.32) * brickmult[nexthealthjump - 1].cumulative;
	if (balldamage > previoushealth) {
		// If greater -> next level - 1 (balldamage between first and previous health)
		var level = brickmult[nexthealthjump].level - 1;
		return level;
	}
	else {
		// If smaller -> use cumulative of previous level
		var level = Math.pow(balldamage / brickmult[nexthealthjump - 1].cumulative, 1/1.32);
		return level;				
	}
}