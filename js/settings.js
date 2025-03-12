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
	var text = JSON.stringify(obj);
	window.localStorage.setItem(key, text);
}

function UpdateData(data, objkey, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	var c = e.currentTarget._DT_CellIndex.column;
	if (data[r] !== undefined) {
		if (data[r].level !== undefined) {
			data[r].level = e.target.value === '' ? null : e.target.value;
			data[r].value = e.target.value === '' || e.target.value === '0' ? null : data[r].base + (data[r].level * data[r].step);
			RefreshValueCell(e);
		}
		else if (objkey !== undefined) {
			data[r][objkey].level = e.target.value === '' ? null : e.target.value;
			RefreshCustomCells(e, [2, 3, 5]);
		}
		else {
			data[r].value = e.target.value === '' ? null : e.target.value;
		}
		console.log('Row changed: ', data[r])
		StoreItem('settings', settings);
	}
}

function UpdateActive(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	if (data[r] !== undefined) {
		data[r]["active"] = !data[r]["active"];
		console.log('Row changed: ', data[r])
		StoreItem('settings', settings);
	}
}

function UpdateFooter() {
	$('#tfoot_badges').html(settings.badges.reduce(function (a, b) { 
		return a + parseInt(b["value"]);
	}, 0));
}

function RefreshValueCell(e) {
	var table = e.target.parentNode.parentNode.parentNode.parentNode.id;
	$('#' + table).DataTable().cells(null, 2).invalidate();	
}

function RefreshCustomCells(e, cols) {
	var table = e.target.parentNode.parentNode.parentNode.parentNode.id;
	$('#' + table).DataTable().cells(null, cols).invalidate();
}

function RefreshDataCells() {
	// override if necessary
}

function RefreshHits() {
	// override if necessary
}

function CreatedValueTemplate(data, objkey) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateData(data, objkey, e);
			UpdateFooter();
			RefreshDataCells();
			RefreshHits();
		});
	}
}

function CreatedActiveTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateActive(data, e);
			RefreshDataCells();
			RefreshHits();
		});
	}
}

function ColumnLevelTemplate(data, title, width, forceMax) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function ( data, type, row ) { 
			if (data === undefined) {
				return '';
			}
			
			if (forceMax === undefined) {
				max = row.max;
			}
			else {
				max = forceMax;
			}

			var step = row.step ? row.step : 1;
			var min = row.min ? row.min : 0;

			if ( type === 'display' ) {
				return '<input type="number" step="' + step + '" min="' + min + '" max="' + max + '" value="' + data + '">';
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
		render: function ( data, type, row ) {
			if ( type === 'display' ) { 
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

function ColumnDataTemplate(data, title, width, format) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {			
			if ( type === 'display' ) {
				if (data == null) {
					return '';
				}
				
				if (format) {
					if (row.key.includes(' Cost') || (row.key === 'Splash Damage' && data > 10) || row.key === 'Archer Sniper' || row.key === 'Fly Children!' || row.key === 'Floor is Lava') {
						return data + '%';
					}

					return FormatNumber(data);					
				}
			}
			return data;
		}, 
	};
}

function ColumnObjectDataTemplate(data, title, width, objkey, format) {
	return { 
		data: data, 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {			
			if ( type === 'display' ) {				
				if (typeof data === 'object' && objkey) {
					data = data[row[objkey].level];
				}
				
				if (data == null) {
					return '';
				}
				
				if (format) {
					if (row.key.includes(' Cost') || (row.key === 'Splash Damage' && data > 10) || row.key === 'Archer Sniper' || row.key === 'Fly Children!' || row.key === 'Floor is Lava') {
						return data + '%';
					}

					return FormatNumber(data);					
				}
			}
			return data;
		}, 
	};
}

function BuildSettingsTable() {
	try {
		BuildSettingsTableWithErrorLog();
	} catch (e) {
		alert(e.stack);
	}
}

function BuildSettingsTableWithErrorLog() {
	$(document).ready(function() {
		$("input[type=number]").focus().select();
	});

	$('#table_prestige').DataTable({
		data: settings.prestige,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.prestige)
		}],
		columns: [
			{ data: 'key', title: "Prestige Badges", width: '125px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_cards').DataTable({
		data: settings.cards,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.cards, 'card')
		},{
			targets: 2,
			createdCell: CreatedValueTemplate(settings.cards)
		},{ 
			targets: 3,
			createdCell: CreatedValueTemplate(settings.cards)
		},{
			targets: 4,
			createdCell: CreatedValueTemplate(settings.cards, 'mastery')
		},{ 
			targets: 6,
			createdCell: CreatedActiveTemplate(settings.cards)
		}],
		columns: [
			{ data: 'key', title: "Cards", width: '125px' },
			ColumnLevelTemplate('card.level', 'Level', '50px', 12),
			ColumnObjectDataTemplate('card.value1', "Value 1", '50px', 'card', true),
			ColumnObjectDataTemplate('card.value2', "Value 2", '50px', 'card', true),
			ColumnLevelTemplate('mastery.level', 'Mastery', '50px', 6),
			ColumnObjectDataTemplate('mastery.value', "Value", '50px', 'mastery', true),
			ColumnCheckboxTemplate('active', 'Active?', '50px'),
		],
	});

	$('#table_perks').DataTable({
		data: settings.perks,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.perks)
		}],
		columns: [
			{ data: 'key', title: "Perks", width: '125px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_boosts').DataTable({
		data: settings.boosts,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedActiveTemplate(settings.boosts)
		}],
		columns: [
			{ data: 'key', title: "Boosts", width: '125px' },
			ColumnCheckboxTemplate('active', 'Active?', '50px'),
		],
	});

	$('#table_badges').DataTable({
		data: settings.badges,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		fixedHeader: {
			footer: true,
		},
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.badges)
		}],
		columns: [
			{ data: 'key', title: "Challenge Badges", width: '125px' },
			ColumnLevelTemplate('value', 'Value', '50px'),
		],
		"footerCallback": function( tfoot, data, start, end, display ) {
			// executes only on draw()
			UpdateFooter();
		}
	});

	$('#table_basicskills').DataTable({
		data: settings.skills.basic,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.basic)
		},{ 
			targets: 3,
			createdCell: CreatedActiveTemplate(settings.skills.basic)
		}],
		columns: [
			{ data: 'key', title: "Basic Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_splashskills').DataTable({
		data: settings.skills.splash,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.splash)
		}],
		columns: [
			{ data: 'key', title: "Splash Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_sniperskills').DataTable({
		data: settings.skills.sniper,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.sniper)
		}],
		columns: [
			{ data: 'key', title: "Sniper Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_poisonskills').DataTable({
		data: settings.skills.poison,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.poison)
		}],
		columns: [
			{ data: 'key', title: "Poison Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_demoskills').DataTable({
		data: settings.skills.demo,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.demo)
		},{ 
			targets: 3,
			createdCell: CreatedActiveTemplate(settings.skills.demo)
		}],
		columns: [
			{ data: 'key', title: "Demo Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_scatterskills').DataTable({
		data: settings.skills.scatter,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.scatter)
		},{ 
			targets: 3,
			createdCell: CreatedActiveTemplate(settings.skills.scatter)
		}],
		columns: [
			{ data: 'key', title: "Scatter Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_cashskills').DataTable({
		data: settings.skills.cash,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.cash)
		}],
		columns: [
			{ data: 'key', title: "Cash Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_pierceskills').DataTable({
		data: settings.skills.pierce,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.pierce)
		}],
		columns: [
			{ data: 'key', title: "Pierce Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_swordskills').DataTable({
		data: settings.skills.sword,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.sword)
		}],
		columns: [
			{ data: 'key', title: "Sword Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_fireskills').DataTable({
		data: settings.skills.fire,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.fire)
		}],
		columns: [
			{ data: 'key', title: "Fire Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_lightningskills').DataTable({
		data: settings.skills.lightning,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.lightning)
		}],
		columns: [
			{ data: 'key', title: "Lightning Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_proportionalskills').DataTable({
		data: settings.skills.proportional,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.skills.proportional)
		}],
		columns: [
			{ data: 'key', title: "Proportional Skill Tree", width: '200px' },
			ColumnLevelTemplate('level', 'Level', '50px'),
			ColumnDataTemplate('value', "Value", '50px', true),
		],
	});

	$('#table_powermap').DataTable({
		data: settings.powermap,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedValueTemplate(settings.powermap)
		}],
		columns: [
			{ data: 'key', title: "Power Map", width: '200px' },
			ColumnLevelTemplate('value', "Value", '50px', true),
		],
	});
}