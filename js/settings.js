var settings = GetItem("settings", defaultsettings);

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

function UpdateData(data, e) {
	var r = e.currentTarget._DT_CellIndex.row;
	if (data[r] !== undefined) {
		data[r]["value"] = e.target.value === '' ? null : e.target.value;
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

function RefreshDataCells() {
	// override if necessary
}

function CreatedValueTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateData(data, e);
			UpdateFooter();
			RefreshDataCells();
		});
	}
}

function CreatedActiveTemplate(data) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateActive(data, e);
			RefreshDataCells();
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

function BuildSettingsTable() {
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			createdCell: CreatedValueTemplate(settings.cards)
		},{ 
			targets: 2,
			createdCell: CreatedActiveTemplate(settings.cards)
		}],
		columns: [
			{ data: 'key', title: "Cards", width: '125px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			targets: 2,
			createdCell: CreatedActiveTemplate(settings.skills.basic)
		}],
		columns: [
			{ data: 'key', title: "Basic Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			targets: 2,
			createdCell: CreatedActiveTemplate(settings.skills.demo)
		}],
		columns: [
			{ data: 'key', title: "Demo Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			targets: 2,
			createdCell: CreatedActiveTemplate(settings.skills.scatter)
		}],
		columns: [
			{ data: 'key', title: "Scatter Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
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
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});
}