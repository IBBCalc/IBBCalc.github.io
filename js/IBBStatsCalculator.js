var defaultactivetab = {
	"ibbleveltracker": 0,
	"ibbstatscalculator": 0,
}

var tabs = GetItem("statsCalculator", defaulttabs);
var activeTab = GetItem("activeTab", defaultactivetab);

var settings = GetItem("settings", defaultsettings);

var totalcost = 0;

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

function getScreenShot(){
	var activeTab = GetItem("activeTab", defaultactivetab);
	var tableid = tabs[activeTab.ibbstatscalculator].id + '_table';
	
    let src = document.getElementById(tableid);
    html2canvas(src).then(function(canvas) {
	  canvas.toBlob(function(blob) {
		navigator.clipboard
		  .write([
			new ClipboardItem(
			  Object.defineProperty({}, blob.type, {
				value: blob,
				enumerable: true
			  })
			)
		  ])
		  .then(function() {});
	  });
    });
}

function GetSettings(tab, key, def) {
	if (tab.global_settings_active) {
		if (Object.keys(settings).includes(key)
			&& settings[key] !== null) {
			return settings[key];
		}
	}
	else if (Object.keys(tab.settings).includes(key)
		&& tab.settings[key] !== null){
		return tab.settings[key];
	}
		
	return def;
}

function SetSettings(tab, key, value) {
	if (tab.global_settings_active) {
		settings[key] = value;
		StoreItem("settings", settings);
	}
	else {
		tab.settings[key] = value;
		StoreItem("statsCalculator", tabs);
	}
}

function GetSettingsIfTrue(tab, ifkey, key, def) {
	if (tab.global_settings_active) {
		if (Object.keys(settings).includes(ifkey)
			&& settings[ifkey]) {
			return GetSettings(tab, key, def);
		}
	}
	else if (Object.keys(tab.settings).includes(ifkey)
		&& tab.settings[ifkey]){
		return GetSettings(tab, key, def);
	}
		
	return def;
}

function GetTabValue(tab, key, def) {
	if (Object.keys(tab).includes(key)
		&& tab[key] !== null) {
		return tab[key];
	}
	
	return def;
}

function GetKeyFromEvent(event) {	
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	return element.id.slice(tabsplit + 1);	
}

function GetTabFromEvent(event) {	
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	return tabs.find(e => e.id === id);
}

const lookup = [
	{ value: 1, symbol: "" },
	{ value: 1e3, symbol: "K" },
	{ value: 1e6, symbol: "M" },
	{ value: 1e9, symbol: "B" },
	{ value: 1e12, symbol: "T" },
	{ value: 1e15, symbol: "q" },
	{ value: 1e18, symbol: "Q" },
	{ value: 1e21, symbol: "s" },
	{ value: 1e24, symbol: "S" },
	{ value: 1e27, symbol: "O" },
	{ value: 1e30, symbol: "N" },
	{ value: 1e33, symbol: "D" },
	{ value: 1e36, symbol: "aa" },
	{ value: 1e39, symbol: "ab" },
	{ value: 1e42, symbol: "ac" },
	{ value: 1e45, symbol: "ad" },
	{ value: 1e48, symbol: "ae" },
	{ value: 1e51, symbol: "af" },
	{ value: 1e54, symbol: "ag" },
	{ value: 1e57, symbol: "ah" },
	{ value: 1e60, symbol: "ai" },
	{ value: 1e63, symbol: "aj" },
	{ value: 1e66, symbol: "ak" },
	{ value: 1e69, symbol: "al" },
	{ value: 1e72, symbol: "am" },
	{ value: 1e75, symbol: "an" },
	{ value: 1e78, symbol: "ao" },
	{ value: 1e81, symbol: "ap" },
	{ value: 1e84, symbol: "aq" },
	{ value: 1e87, symbol: "ar" },
	{ value: 1e90, symbol: "as" },
	{ value: 1e93, symbol: "at" },
	{ value: 1e96, symbol: "au" },
	{ value: 1e99, symbol: "av" },
	{ value: 1e102, symbol: null },
];
function FormatNumber(num) {
	var item = lookup.slice().reverse().find(function (item) {
		return num >= item.value;
	});

	if (item === undefined) {
		return 0;
	}

	if (item.symbol === null) {
		return num.toExponential(2);
	}

	return item ? (num / item.value).toFixed(2) + item.symbol : "0";
}
function UnFormatNumber(text) {
	if (!isNaN(text)) {
		return parseFloat(text);
	}
	
	var num = parseFloat(text);
	if (isNaN(num)) {
		return NaN;
	}
	
	var symbol = text.replace(num, '');
	var item = lookup.slice().reverse().find(function (item) {
		return symbol == item.symbol;
	});

	if (item === undefined) {
		return NaN;
	}
	
	return num * item.value;
}

function handleCalculatorChange(event) {
	var element = event.target;
	var value = element.value;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	var elementid = element.id.slice(tabsplit + 1);

	if (elementid.includes("type")) {
		console.log(tab[elementid], value);
		tab[elementid] = value;
	}
	else if (elementid.includes("active")) {
		console.log(tab[elementid], element.checked);
		tab[elementid] = element.checked;
	}
	else {
		if (value === '') {
			console.log(tab[elementid], null);
			tab[elementid] = null;
		}
		else {
			console.log(tab[elementid], parseInt(value));
			tab[elementid] = parseInt(value);
		}
	}

	StoreItem("statsCalculator", tabs);
	BuildStatsCalculator(tab);
}

function handleSettingsChange(event) {
	var element = event.target;
	var value = element.value;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	var elementid = element.id.slice(tabsplit + 1);

	if (elementid.includes("active")) {
		console.log(GetSettings(tab, elementid), element.checked);
		SetSettings(tab, elementid, element.checked);
	}
	else {
		if (value === '') {
			console.log(GetSettings(tab, elementid), null);
			SetSettings(tab, elementid, null);
		}
		else {
			console.log(GetSettings(tab, elementid), parseFloat(value));
			SetSettings(tab, elementid, parseFloat(value));
		}
	}
	
	BuildStatsCalculator(tab);
}

function handleWindfallChange(event) {
	var value = event.target.value;
	var tab = GetTabFromEvent(event);
	var key = GetKeyFromEvent(event);
	
	if (!isNaN(value)) {
		console.log(GetSettings(tab, key), parseFloat(value));
		SetSettings(tab, key, parseFloat(value));
	}
	else {
		var num = UnFormatNumber(value);
		if (isNaN(num)) {
			$('#' + tab.id + key).val(NaN);
			console.log(GetSettings(tab, key), NaN);
			SetSettings(tab, key, NaN);
		}
		else {
			console.log(GetSettings(tab, key), value);
			SetSettings(tab, key, value);			
		}
	}
	
	BuildStatsCalculator(tab);
}

function handleTabChange(event) {
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	
	if (tabs.includes(tab)) {
		BuildStatsCalculator(tab);
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
	$('#tab_content').append('<div id="' + tab.id + '" class="tab-pane">' + table_template.replaceAll('%tab%', tab.id) + '</div>');
	BuildStatsCalculator(tab);
}

function handleShowAllSettingsToggle(event) {
	var element = event.target;
	var tabsplit = element.id.indexOf('_');
	var id = element.id.slice(0, tabsplit);
	var tab = tabs.find(e => e.id === id);
	console.log(tab.all_settings_active, element.checked);
	tab.all_settings_active = element.checked;
	
	$('.' + id + '_togglerow').toggleClass('hide');
	
	StoreItem("statsCalculator", tabs);
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
			BuildStatsCalculator(tabs[0]);
		}
	}
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function GetKeyValue(data, key, def) {
	var entry = data.find(d => d.key === key);
	if (entry === undefined) {
		return def;
	}
	
	if (entry.value === null) {
		return def;
	}
	
	return entry.value;
}

function GetKeyValueIfActive(data, key, def) {
	var entry = data.find(d => d.key === key);
	if (entry === undefined) {
		return def;
	}
	
	if (entry.active) {
		return entry.value;
	}
	
	return def;
}

function GetKeyActive(data, key, iftrue, iffalse) {
	var entry = data.find(d => d.key === key);
	if (entry === undefined) {
		return iffalse;
	}
	
	if (entry.active) {
		return iftrue;
	}
	
	return iffalse;
}

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

function CreatedNumberTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateNumber(data, e);
			$('#tfoot_calculator').html(settings.badges.reduce(function (a, b) { 
				return a + parseInt(b["value"]);
			}, 0));
			
			// Refresh all data cells in current row
			$('#table_calculator').DataTable().cells(e.currentTarget._DT_CellIndex.row, [8,9]).invalidate();
			// Refresh footer row
			$('#table_calculator').DataTable().row(13).invalidate();
		});
	}
}

function CreatedCheckboxTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateCheckbox(data, e);
			
			// Refresh all data cells in current row
			$('#table_calculator').DataTable().cells(e.currentTarget._DT_CellIndex.row, [8,9]).invalidate();
			// Refresh footer row
			$('#table_calculator').DataTable().row(13).invalidate();
		});
	}
}

function CreatedDropdownTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {			
			UpdateText(data, e);
			
			// Refresh all data cells in current row
			$('#table_calculator').DataTable().cells(e.currentTarget._DT_CellIndex.row, [8,9]).invalidate();
			// Refresh footer row
			$('#table_calculator').DataTable().row(13).invalidate();
		});
	}
}

function ColumnNumberTemplate(data, title, width) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function ( data, type, row ) { 
			if (data === undefined) {
				return '';
			}

			if ( type === 'display' ) {
				return '<input type="number" value="' + data + '">';
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
		render: function ( data, type, row, meta ) {
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
		render: function ( data, type, row ) {
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

function ColumnDataTemplate(func, title, width) {
	return { 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function (data, type, row) {			
			var value = func(row);
			if ( type === 'display' ) { 
				return value; // + formatting
			}
			
			return value;
		}, 
	};
}

function BuildPage() {
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
	//$('#tab_content').append('<div id="' + id + '" class="tab-pane ' + ((i == 0) ? 'active' : '') + '">' + datatable_footer_template.replaceAll('%tab%', id).replaceAll('%tablename%', 'calculator') + '</div>');

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
			ColumnCheckboxTemplate('enrage', 'Enraged', '30px'),
			ColumnDataTemplate(CalculateSpeed, 'Speed', '40px'),
			ColumnDataTemplate(CalculatePower, 'Power', '40px'),
		],
		"footerCallback": function( tfoot, data, start, end, display ) {
			// executes only on draw()
			$('#tfoot_calculator').html(settings.badges.reduce(function (a, b) { 
				return a + parseInt(b["value"]);
			}, 0));
		},
	});
	
	
	return;



	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// // Build Html of nav tabs
	// for (var i = 0; i < tabs.length; i++) {
		// var id = tabs[i].id;
		// var name = tabs[i].name;
		// $('#tab_nav').append(navbar_template.replaceAll('%tab%', id).replaceAll('%tabname%', name).replaceAll('%active%', ((i == 0) ? 'active' : '')));
	// }
	
	// $('#tab_nav').append('<li id="newtab_id" class=""><a id="newtab_name" href="#" onclick="handleNewTab(event)">+</a></li>');
	
	// // Build Html of all tabs				
	// for (var i = 0; i < tabs.length; i++) {
		// var id = tabs[i].id;
		// $('#tab_content').append('<div id="' + id + '" class="tab-pane ' + ((i == 0) ? 'active' : '') + '">' + table_template.replaceAll('%tab%', id) + '</div>');
	// }
	
	// if (tabs.length > 0) {
		// BuildStatsCalculator(tabs[activeTab.ibbstatscalculator]);
	// }
}

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
		* GetKeyValueIfActive(settings.cards, 'Ball Speed', 1)
		* GetKeyActive(settings.cards, 'Quality Control', 0.5, 1)
		* GetKeyValue(settings.perks, 'Ball Speed', 1)
		* ((speedLevel > 40) ? 0.4 : 1)
		* ((speedLevel > 80) ? 0.4 : 1)
		* GetKeyValue(settings.skills[row.type], 'Speed', 1)
		* ((row.enrage) ? GetKeyValue(settings.skills[row.type], 'Enrage', 1) : 1));
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
		* GetKeyValueIfActive(settings.cards, 'Ball Power', 1)
		* GetKeyValueIfActive(settings.cards, 'Quality Control', 1)
		* ((row.ballspec) ? GetKeyValue(settings.cards, 'Ball Spec.', 1) : 1)
		* GetKeyValue(settings.perks, 'Ball Power', 1)
		* GetKeyActive(settings.boosts, 'Power Hungry', 3, 1)
		* ((speedLevel > 40) ? 5 : 1)
		* ((speedLevel > 80) ? 5 : 1)
		* GetKeyValue(settings.badges, row.type, 1)
		* GetKeyValue(settings.skills[row.type], 'Damage', 1)
		* GetKeyValue(settings.skills[row.type], 'Power', 1) // cash
		* ((row.friend) ? GetKeyValue(settings.skills[row.type], 'Friend Bonus', 1) : 1)
		* ((row.enrage) ? GetKeyValue(settings.skills[row.type], 'Enrage Fight', 1) : 1)
		* ((row.enrage) ? Math.pow(GetKeyValue(settings.skills[row.type], 'Cumulative Strength', 1), 3) : 1));
	return power;
}

// function BuildStatsCalculator(tab) {
	// var tagid = '#' + tab.id + '_';

	// activeTab.ibbstatscalculator = tabs.indexOf(tab);
	// StoreItem('activeTab', activeTab);
	// $('#' + tab.id + '_name').tab('show');
	
	// // Calculator
	// for (var key in tab) {
		// if (key.includes("active")) {
			// $(tagid + key).prop('checked', tab[key]);
		// }
		// else {
			// $(tagid + key).val(tab[key]);
		// }
	// }

	// totalcost = 0;
	// for (var i in slots) {
		// CalculateRow(tab, slots[i]);
	// }

	// $(tagid + 'totalcost').html(FormatNumber(totalcost));
	// $(tagid + 'totalwindfall').html(CalculateWindfallCost(tab, totalcost));
	// $('#header_windfall').val(tab.header_windfall)
	
	// // Tab-Settings
	// var totalbadges = 0;
	// var tabsettings = ((tab.global_settings_active) ? settings : tab.settings);
	// for (var key in tabsettings) {
		// if (key.includes("active")) {
			// $(tagid + key).prop('checked', GetSettings(tab, key, false));
		// }
		// else {
			// $(tagid + key).val(GetSettings(tab, key, null));
		// }
		
		// if (key.includes("badges")) {
			// totalbadges += GetSettings(tab, key, null);
		// }
	// }

	// $(tagid + 'badges_total').html(totalbadges);
	
	// if (!tab.all_settings_active) {
		// $('.' + tab.id + '_togglerow').addClass('hide');
	// }
	
	// var powerCard = GetSettings(tab, 'cards_power_value', null);
	// if (powerCard === 2.4
		// || powerCard === 2.8
		// || powerCard === 3.2
		// || powerCard === 3.6) {
		// alert('Your power card value is wrong, the card in game has a bug.\n\
// These are the possible values:\n\
// Level 1: 1.5\n\
// Level 2: 2.0\n\
// Level 3: 2.5\n\
// Level 4: 3.0\n\
// Level 5: 3.5\n\
// Level 6: 4.0')
	// }
// }

// function CalculateRow(tab, slot) {
	// var tagid = '#' + tab.id + '_';
	
	// var balltype = tab[slot + "_type"];
	// if (balltype === null || balltype === "null") {
		// $(tagid + slot + '_speed').html("");
		// $(tagid + slot + '_power').html("");
		// $(tagid + slot + '_cost').html("");
		// $(tagid + slot + '_dmg_poison').html("");
		// $(tagid + slot + '_1shot_brick').html("");
		// $(tagid + slot + '_1shot_hex').html("");
		// $(tagid + slot + '_1shot_shield').html("");
		// // $(tagid + slot + '_chain_brick').html("");
		// // $(tagid + slot + '_chain_hex').html("");
		// // $(tagid + slot + '_chain_shield').html("");
		// $(tagid + slot + '_windfall').html("");
		// return;
	// }

	// // Speed
	// var speed = CalculateSpeed(tab, balltype, slot);
	// $(tagid + slot + '_speed').html(speed.toFixed(2));

	// // Power
	// var power = CalculatePower(tab, balltype, slot);
	// $(tagid + slot + '_power').html(FormatNumber(power));

	// // Cost
	// var cost = CalculateCost(tab, slot);
	// $(tagid + slot + '_cost').html(FormatNumber(cost));
	// totalcost += cost;
	
	// // Windfall gems cost
	// var windfallcost = CalculateWindfallCost(tab, cost);
	// $(tagid + slot + '_windfall').html(windfallcost);
	
	// // Damage with x Poison
	// var damage = null;
	// var poisonpower = 1;
	// if (balltype !== "poison" && balltype !== "cash") {
		// const temp = CalculateDamageWithPoison(tab, balltype, power);
		// damage = temp.damage;
		// poisonpower = temp.poisonpower;
		// if (damage !== null) {
			// $(tagid + slot + '_dmg_poison').html(FormatNumber(damage));
		// }
		// else {
			// damage = power;
			// $(tagid + slot + '_dmg_poison').html("");
		// }

		// // Last 1 shots.
		// // Green bricks
		// var bricklevel = CalculateLastBrickLevel(damage);
		// if (bricklevel > 100e6) {
			// $(tagid + slot + '_1shot_brick').html(FormatNumber(bricklevel));
		// }
		// else {
			// $(tagid + slot + '_1shot_brick').html(bricklevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
		// }
		
		// // Hex bricks
		// var hexlevel = CalculateLastBrickLevel(damage / 25);
		// if (hexlevel > 100e6) {
			// $(tagid + slot + '_1shot_hex').html(FormatNumber(hexlevel));
		// }
		// else {
			// $(tagid + slot + '_1shot_hex').html(hexlevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
		// }
		
		// // Shield Hex bricks
		// var shielddamage = damage / 25 / (500 / GetSettingsIfTrue(tab, "cards_shieldpen_active", "cards_shieldpen_value", 1));
		// if (balltype === "sword") {
			// shielddamage = damage / 25;
		// }				
		// var shieldlevel = CalculateLastBrickLevel(shielddamage);
		// if (shieldlevel > 100e6) {
			// $(tagid + slot + '_1shot_shield').html(FormatNumber(shieldlevel));
		// }
		// else {
			// $(tagid + slot + '_1shot_shield').html(shieldlevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
		// }
	// }
	// else {		
		// $(tagid + slot + '_dmg_poison').html("");
		// $(tagid + slot + '_1shot_brick').html("");
		// $(tagid + slot + '_1shot_hex').html("");
		// $(tagid + slot + '_1shot_shield').html("");
		// // $(tagid + slot + '_chain_brick').html("");
		// // $(tagid + slot + '_chain_hex').html("");
		// // $(tagid + slot + '_chain_shield').html("");
		// return;
	// }
	
	// // Fixed in v1.9.2
	// // // Lightning chain shenanigans
	// // if (balltype === "lightning") {
	// // 	// Ignoring catalyst, it only applies when the chain hits a poisoned brick, but not when only the ball hits a poisoned brick. (it will still apply poison in both cases)
	// // 	var chaindamage = 0.3 * power * poisonpower; //* GetSettingsIfTrue(tab, "cards_catalyst_active", "cards_catalyst_value", 1);
		
	// // 	// Green bricks
	// // 	var bricklevel = CalculateLastBrickLevel(chaindamage);
	// // 	if (bricklevel > 100e6) {
	// // 		$(tagid + slot + '_chain_brick').html(FormatNumber(bricklevel));
	// // 	}
	// // 	else {
	// // 		$(tagid + slot + '_chain_brick').html(bricklevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
	// // 	}
		
	// // 	// Hex bricks
	// // 	var hexlevel = CalculateLastBrickLevel(chaindamage / 25);
	// // 	if (hexlevel > 100e6) {
	// // 		$(tagid + slot + '_chain_hex').html(FormatNumber(hexlevel));
	// // 	}
	// // 	else {
	// // 		$(tagid + slot + '_chain_hex').html(hexlevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
	// // 	}
		
	// // 	// Shield Hex bricks (assume only 1 part hits shield, if both ball and chain hit shield, shield modifier and shield pen should be quadratic)
	// // 	var shielddamage = chaindamage / 25 / (500 / GetSettingsIfTrue(tab, "cards_shieldpen_active", "cards_shieldpen_value", 1));
	// // 	var shieldlevel = CalculateLastBrickLevel(shielddamage);
	// // 	if (shieldlevel > 100e6) {
	// // 		$(tagid + slot + '_chain_shield').html(FormatNumber(shieldlevel));
	// // 	}
	// // 	else {
	// // 		$(tagid + slot + '_chain_shield').html(shieldlevel.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));			
	// // 	}
	// // }
// }

function CalculateCost(tab, slot) {
	var amountLevel = GetTabValue(tab, slot + '_amount', 0);
	var speedLevel = GetTabValue(tab, slot + '_speedLevel', 0);
	var powerLevel = GetTabValue(tab, slot + '_powerLevel', 0);

	var ballcostmod = (1 + (GetSettings(tab, "prestige_ballCost", 0) / 100)) * (1 + (GetSettings(tab, "perks_ballCost", 0) / 100));
	var speedcostmod = (1 + (GetSettings(tab, "prestige_speedCost", 0) / 100)) * (1 + (GetSettings(tab, "perks_speedCost", 0) / 100));
	var powercostmod = (1 + (GetSettings(tab, "prestige_powerCost", 0) / 100)) * (1 + (GetSettings(tab, "perks_powerCost", 0) / 100));

	var sumballcost = 0;
	for (var i = 0; i < amountLevel; i++) {
		sumballcost += basecosts[slot].ball * Math.pow(1.9, i)
	}

	var sumspeedcost = 0;
	for (var i = 0; i < speedLevel; i++) {
		sumspeedcost += basecosts[slot].speed * Math.pow(1.9, i)
	}

	var sumpowercost = 0;
	for (var i = 0; i < powerLevel; i++) {
		sumpowercost += basecosts[slot].power * Math.pow(1.9, i)
	}

	var buycost = basecosts[slot].buy;
	var ballcost = ((amountLevel > 0) ? sumballcost * ballcostmod : 0);
	var speedcost = ((speedLevel > 0) ? sumspeedcost * speedcostmod : 0);
	var powercost = ((powerLevel > 0) ? sumpowercost * powercostmod : 0);
	var prestige1cost = ((speedLevel > 40) ? basecosts[slot].speed * Math.pow(1.9, 38) * 9.49 : 0) * speedcostmod;
	var prestige2cost = ((speedLevel > 80) ? basecosts[slot].speed * Math.pow(1.9, 78) * 9.49 : 0) * speedcostmod;
	var cost = buycost + ballcost + speedcost + powercost + prestige1cost + prestige2cost;
	return cost;
}

function CalculateWindfallCost(tab, cost) {
	var start = UnFormatNumber(GetSettings(tab, 'header_windfall', NaN));
	if (isNaN(start)) {
		return '';
	}
	
	if (start > cost) {
		return '';
	}
	
	var wf = Math.log(cost / start) / Math.log(1.3);
	return Math.ceil(wf) * 25;
}

function SkillsTreeModifier(tab, balltype, stat, def) {
	var key = 'skillstree_' + balltype + '_' + stat;
	return GetSettings(tab, key, def);
}

function CalculateDamageWithPoison(tab, balltype, otherpower) {
	var tagid = '#' + tab.id + '_';
	var poisonslot = null;
	for (var i in slots) {
		if (tab[slots[i] + "_type"] === "poison") {
			poisonslot = slots[i];
			$(tagid + 'header_dmg_poison').html("Damage w/<br>" + poisonslot + " Poison");
			if (poisonslot === "7.5k") {
				$(tagid + 'header_dmg_poison').html("Damage w/<br>7.5k Poison");
			}
			
			break;
		}
	}
	
	var speedLevel = GetTabValue(tab, poisonslot + '_speedLevel', 0);
	var powerLevel = GetTabValue(tab, poisonslot + '_powerLevel', 0);	
	if (poisonslot === null) {
		$(tagid + 'header_dmg_poison').html("Damage w/<br>Noxious Fumes");
		poisonslot = "7.5k";
		speedLevel = 0;
		powerLevel = 0;
	}
	
	var poisonpower = CalculatePower(tab, "poison", poisonslot, speedLevel, powerLevel);
	if (balltype === "lightning") {
		var lightningdamage = otherpower * poisonpower;
		var catalyst = GetSettingsIfTrue(tab, "cards_catalyst_active", "cards_catalyst_value", 1);
		return {
			damage: (lightningdamage * catalyst),
			poisonpower: poisonpower,
		};
	}
	
	return {
		damage: otherpower * poisonpower * GetSettingsIfTrue(tab, "cards_catalyst_active", "cards_catalyst_value", 1),
		poisonpower: poisonpower,
	};
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
		var level = Math.pow(balldamage / brickmult[brickmult.length - 1].cumulative, 1/1.32);
		return level;
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