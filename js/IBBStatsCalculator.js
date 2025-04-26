var tabs = GetItem("statsCalculator", defaulttabs);
var activeTab = GetItem("activeTab", defaultactivetab);

if (tabs == []) {
	tabs = defaulttabs;
	activeTab.ibbstatscalculator = 0;
}
var settings = GetItem("settings", defaultsettings);
UpgradeSettingScripts(settings, 'settings');
UpgradeTabScripts(tabs, 'statsCalculator')

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

// %%%%%%%%%%%%%%%%%%%%%%% Handle Tab events %%%%%%%%%%%%%%%%%%%%%%%

function handleTabChange(event) {
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	
	if (tabs.includes(tab)) {
		ReBuildTable(tab);
	}
}

function handleNewTab(event) {
	var newindex = tabs.length;			
	
	if (tabs.length > 0) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs.find(e => e.id === 'tab' + i) === undefined) {
				newindex = i;
				break;
			}
		}
		
		tabs.push(structuredClone(tabs[0]));
	}
	else {
		tabs.push(structuredClone(defaulttabs[0]))
	}
	
	var tab = tabs[newindex];
	tab.id = "tab" + newindex;
	tab.name = "Tab " + newindex;
	
	console.log('Create new tab ' + tab.name);
	StoreItem("statsCalculator", tabs);
	
	$(navbar_template.replaceAll('%tab%', tab.id).replaceAll('%tabname%', tab.name).replaceAll('%active%', '')).insertBefore('#newtab_id');
	ReBuildTable(tab);
}

function handleTabEdit(event) {
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	
	var newname = prompt('Rename tab ' + tab.name, tab.name);
	if (newname !== null && newname !== "null") {
		console.log('Rename tab ' + tab.name + ' to ' + newname);
		$('#' + id + '_name').html($('#' + id + '_name').html().replace(tab.name, newname));
		tab.name = newname;
		StoreItem("statsCalculator", tabs);
	}
}

function handleTabRemove(event) {
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	
	if (confirm('Are you sure you want to delete tab ' + tab.name)) {
		console.log('Delete tab ' + tab.name);
		tabs.splice(tabs.indexOf(tab), 1);
		$('#' + id + '_id').remove();
		$('#' + id).remove();
		StoreItem("statsCalculator", tabs);
		if (tabs.length > 0) {
			ReBuildTable(tabs[0]);
		}
	}
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
		StoreItem('statsCalculator', tabs);
	}
}
function UpdateText(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		data[r][Object.keys(data[r])[c]] = e.target.value === 'null' ? null : e.target.value;
		console.log('Row changed: ', data[r])
		StoreItem('statsCalculator', tabs);
	}
}

function UpdateCheckbox(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		data[r][Object.keys(data[r])[c]] = !data[r][Object.keys(data[r])[c]];
		console.log('Row changed: ', data[r])
		StoreItem('statsCalculator', tabs);
	}
}

function UpdateFooter() {
	var totalcost = $('#table_calculator').DataTable().cells([0,1,2,3,4,5,6,7,8,9,10,11], 10).render('a').reduce(function(a, b) {
		if (isNaN(b) || b === '') {
			return a;
		}
		return a + parseFloat(b);
	}, 0);
	$('#tfoot_cost').html(FormatNumber(totalcost));
	
	var totalwindfallcost = $('#table_calculator').DataTable().cells([0,1,2,3,4,5,6,7,8,9,10,11], 11).render('a').reduce(function(a, b) {
		if (isNaN(b) || b === '') {
			return a;
		}
		return a + parseFloat(b);
	}, 0);
	$('#tfoot_windfall').html(totalwindfallcost);
	
	$('#tfoot_badges').html(settings.badges.reduce(function (a, b) { 
		return a + parseInt(b["value"]);
	}, 0));
}

function UpdateWindfall(tab, e) {
	tab.windfall = e.target.value;
	console.log('Windfall changed: ', tab.windfall)
	StoreItem('statsCalculator', tabs);
	$('#table_calculator').DataTable().rows().invalidate();
}

// %%%%%%%%%%%%%%%%%%%%%%% Created Cell Templates %%%%%%%%%%%%%%%%%%%%%%%

function RefreshDataCells() {
	var datacells = [8,9,10,11,12,13,14,15];
	$('#table_calculator').DataTable().cells([0,1,2,3,4,5,6,7,8,9,10,11], datacells).invalidate();
}

function RefreshRows() {
	$('#table_calculator').DataTable().rows([0,1,2,3,4,5,6,7,8,9,10,11]).invalidate();
}

function CreatedNumberTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateNumber(data, e);
			UpdateFooter();
			RefreshDataCells();
		});
	}
}

function CreatedCheckboxTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateCheckbox(data, e);
			RefreshDataCells();
		});
	}
}

function CreatedDropdownTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {			
			UpdateText(data, e);
			UpdateFooter();
			RefreshRows();
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
				if (meta.col === 5 && GetKeyActive(settings.cards, 'Ball Spec.')) {
					row.ballspec = false;
					return '';
				}
				
				// Friend Bonus not unlocked
				if (meta.col === 6 && GetKeyValue(settings.skills.basic, 'Friend Bonus') === undefined) {
					row.friend = false;
					return '';
				}
				
				// No poison or demo selected. Or they are selected, but their relative Enrage is not unlocked.
				if (meta.col === 7 
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
				var select = '<select>';
				select += '<option value=null></option>'
				available[row.slot].forEach(balltype => {
					var isselected = row.type === balltype ? 'selected="selected"' : '';
					var balltypetext = balltype.charAt(0).toUpperCase() + balltype.slice(1);
					select += '<option value="' + balltype + '" ' + isselected + '>' + balltypetext + '</option>';
				});
				select += '</select>'
				return select;
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
			// try {
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
			// } catch (e){
			// 	alert(`${e.stack}`);
			// }

			// return '';
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

	// Build Html of nav tabs
	for (var i = 0; i < tabs.length; i++) {
		var id = tabs[i].id;
		var name = tabs[i].name;
		$('#tab_nav').append(navbar_template.replaceAll('%tab%', id).replaceAll('%tabname%', name).replaceAll('%active%', ((i == 0) ? 'active' : '')));
	}
	
	$('#tab_nav').append('<li id="newtab_id" class=""><a id="newtab_name" href="#" onclick="handleNewTab(event)">+</a></li>');

	var tab = tabs[activeTab.ibbstatscalculator];
	if (tab !== undefined) {
		BuildTable(tab, true);
	}
}

function ReBuildTable(tab) {
	$('#table_calculator').DataTable().clear().destroy();
	$('#table_calculator').empty();
	BuildTable(tab, false);
}

function BuildTable(tab, buildSettings) {
	activeTab.ibbstatscalculator = tabs.indexOf(tab);
	StoreItem('activeTab', activeTab);
	$('#' + tab.id + '_name').tab('show');
	
	$('#table_calculator').html('<tfoot>\
			<tr>\
				<td colspan="10">\
				<td id="tfoot_cost">\
				<td id="tfoot_windfall">\
				<td>Windfall from <br/><input type="text" id="windfall_from" /></td>\
				<td colspan="3">\
			</tr>\
		</tfoot>');
	$('#table_calculator').DataTable({
		data: tab.data,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedDropdownTemplate(tab.data)
		},{ 
			targets: [2, 3, 4],
			createdCell: CreatedNumberTemplate(tab.data)
		},{ 
			targets: [5, 6, 7],
			createdCell: CreatedCheckboxTemplate(tab.data)
		}],
		columns: [
			{ data: 'slot', title: "Slot", width: '35px' },
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
			ColumnFuncTemplate(CalculateWindfallCost, 'Windfall Gem Cost', '70px', false),
			ColumnFuncTemplate(CalculateDamageWithPoison, 'Damage w/ Poison', '90px', true),
			ColumnFuncTemplate(CalculateLastGreenBrickLevel, 'Last Stage <br>Dmg > Green HP', '120px', true),
			ColumnFuncTemplate(CalculateLastHexBrickLevel, 'Last Stage <br>Dmg > Hex HP', '120px', true),
			ColumnFuncTemplate(CalculateLastShieldHexBrickLevel, 'Last Stage <br>Dmg > Shield Hex HP', '150px', true),
		],
		"footerCallback": function( tfoot, data, start, end, display ) {
			// executes only on draw()
			UpdateFooter();
		},
	});
	
	var footer = $('#table_calculator').DataTable().column(12).footer();
	$(footer).html('Windfall from <br/><input type="text" id="windfall_from" value="' + tab.windfall + '" />');
	footer.addEventListener('change', function(e) {
		UpdateWindfall(tab, e);
		UpdateFooter();
	});
	
	if (buildSettings) {
		BuildSettingsTable();
	}
}

// %%%%%%%%%%%%%%%%%%%%%%% Calculations %%%%%%%%%%%%%%%%%%%%%%%

function CalculateSpeed(row) {
	if (row === undefined || row.slot === undefined || row.type === null) {
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
	if (row === undefined || row.slot === undefined || row.type === null) {
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
	if (row === undefined || row.slot === undefined || row.type === null) {
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

function CalculateWindfallCost(row, rowindex) {
	if (row === undefined || row.slot === undefined || row.type === null) {
		return null;
	}
	
	var cost = $('#table_calculator').DataTable().cells(rowindex, 10).render('a')[0];
	
	var start = UnFormatNumber(tabs[activeTab.ibbstatscalculator].windfall);
	if (isNaN(start)) {
		return '';
	}
	
	if (start > cost) {
		return '';
	}
	
	var wf = Math.log(cost / start) / Math.log(1.3);
	return Math.ceil(wf) * 25;
}

function CalculateDamageWithPoison(row, rowindex) {
	if (row === undefined || row.slot === undefined || row.type === null) {
		return null;
	}
	
	if (row.type !== null && row.type.localeCompare('poison', undefined) === 0) {
		return null;
	}
	
	var ballpower = $('#table_calculator').DataTable().cell(rowindex, 9).render('a')
		* ((row.type === 'basic') ? GetKeyActive(settings.skills.basic, 'Splash Size', 1.4, 1) : 1)
		* ((row.type === 'splash') ? 1.4 : 1);
	var poisonpower = GetFirstPoisonPower();
	if (poisonpower === null) {
		return ballpower;
	}
	return ballpower 
		* poisonpower 
		* GetObjKeyValueIfActive(settings.cards, 'Catalyst', 'card', 'value1', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Catalyst', 'mastery', 'value', 1)
		* GetObjKeyValueIfActive(settings.cards, 'Noxious Fumes', 'mastery', 'value', 1);
}

function GetFirstPoisonPower() {
	var table = $('#table_calculator').DataTable();
	for (var i in slots) {
		if (table.row(i).data()['type'] !== null && table.row(i).data()['type'].localeCompare('poison', undefined) === 0) {
			var poisonindex = table.row(i)[0][0];
			$(table.column(12).header()).html('Damage w/ ' + slots[i] + ' Poison');
			return table.cell(poisonindex, 9).render('a')
		}
	}
	$(table.column(12).header()).html('Damage w/ Poison');
	return null;
}

function CalculateLastGreenBrickLevel(row, rowindex) {
	if (row === undefined || row.slot === undefined || row.type === null) {
		return null;
	}
	
	if (row.type !== null && (row.type.localeCompare('poison', undefined) === 0 || row.type.localeCompare('cash', undefined) === 0)) {
		return null;
	}
	
	var damage = $('#table_calculator').DataTable().cell(rowindex, 12).render('a');
	return CalculateLastBrickLevel(damage);
}

function CalculateLastHexBrickLevel(row, rowindex) {
	if (row === undefined || row.slot === undefined || row.type === null) {
		return null;
	}
	
	if (row.type !== null && (row.type.localeCompare('poison', undefined) === 0 || row.type.localeCompare('cash', undefined) === 0)) {
		return null;
	}
	
	var damage = $('#table_calculator').DataTable().cell(rowindex, 12).render('a');	
	if (row.type.localeCompare('proportional', undefined) === 0) {
		damage *= 25;
	}

	return CalculateLastBrickLevel(damage/25);
}

function CalculateLastShieldHexBrickLevel(row, rowindex) {
	if (row === undefined || row.slot === undefined || row.type === null) {
		return null;
	}
	
	if (row.type !== null && (row.type.localeCompare('poison', undefined) === 0 || row.type.localeCompare('cash', undefined) === 0)) {
		return null;
	}
	
	var damage = $('#table_calculator').DataTable().cell(rowindex, 12).render('a');	
	if (row.type.localeCompare('proportional', undefined) === 0) {
		damage *= 25;
	}

	var shieldmod = 500 
		/ GetObjKeyValueIfActive(settings.cards, 'Shield Pen.', 'card', 'value1', 1) 
		/ GetObjKeyValueIfActive(settings.cards, 'Shield Pen.', 'mastery', 'value', 1);
	if (row.type.localeCompare('sword', undefined) === 0) {
		shieldmod = 1;
	}

	return CalculateLastBrickLevel(damage/25/shieldmod);
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