var prestige = GetItem("settings_prestige", defaultprestige);
var cards = GetItem("settings_cards", defaultcards);
var perks = GetItem("settings_perks", defaultperks);
var boosts = GetItem("settings_boosts", defaultboosts);
var badges = GetItem("settings_badges", defaultbadges);

var basicskills = GetItem("settings_basicskills", defaultbasicskills);
var splashskills = GetItem("settings_splashskills", defaultsplashskills);
var sniperskills = GetItem("settings_sniperskills", defaultsniperskills);
var poisonskills = GetItem("settings_poisonskills", defaultpoisonskills);
var demoskills = GetItem("settings_demoskills", defaultdemoskills);
var scatterskills = GetItem("settings_scatterskills", defaultscatterskills);
var cashskills = GetItem("settings_cashskills", defaultscashskills);
var pierceskills = GetItem("settings_pierceskills", defaultspierceskills);
var swordskills = GetItem("settings_swordskills", defaultsswordskills);
var fireskills = GetItem("settings_fireskills", defaultfireskills);
var lightningskills = GetItem("settings_lightningskills", defaultlightningskills);

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

function getScreenShot(table){
    let src = document.getElementById(table);
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

function UpdateData(data, e, updatekey) {
	var r = e.currentTarget._DT_CellIndex.row;
	if (data[r] !== undefined) {
		data[r]["value"] = e.target.value === '' ? null : e.target.value;
		console.log('Row changed: ', data[r])
		StoreItem(updatekey, data);
	}
}

function UpdateCheckbox(data, e, updatekey) {
	var r = e.currentTarget._DT_CellIndex.row;
	if (data[r] !== undefined) {
		data[r]["active"] = !data[r]["active"];
		console.log('Row changed: ', data[r])
		StoreItem(updatekey, data);
	}
}

function CreatedCellTemplate(data, updatekey) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateData(data, e, updatekey);
			$('#tfoot_badges').html(badges.reduce(function (a, b) { 
				return a + parseInt(b["value"]);
			}, 0));
		});
	}
}

function CreatedCellActiveTemplate(data, updatekey) {
	return function(cell) {
		cell.addEventListener('change', function(e) {
			UpdateCheckbox(data, e, updatekey);
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
		data: prestige,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(prestige, 'settings_prestige')
		}],
		columns: [
			{ data: 'key', title: "Prestige Badges", width: '125px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_cards').DataTable({
		data: cards,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(cards, 'settings_cards')
		},{ 
			targets: 2,
			createdCell: CreatedCellActiveTemplate(cards, 'settings_cards')
		}],
		columns: [
			{ data: 'key', title: "Cards", width: '125px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
			ColumnCheckboxTemplate('active', 'Active?', '50px'),
		],
	});

	$('#table_perks').DataTable({
		data: perks,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(perks, 'settings_perks')
		}],
		columns: [
			{ data: 'key', title: "Perks", width: '125px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_boosts').DataTable({
		data: boosts,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellActiveTemplate(boosts, 'settings_boosts')
		}],
		columns: [
			{ data: 'key', title: "Boosts", width: '125px' },
			ColumnCheckboxTemplate('active', 'Active?', '50px'),
		],
	});

	$('#table_badges').DataTable({
		data: badges,
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
			createdCell: CreatedCellTemplate(badges, 'settings_badges')
		}],
		columns: [
			{ data: 'key', title: "Challenge Badges", width: '125px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
		"footerCallback": function( tfoot, data, start, end, display ) {
			// executes only on draw()
			var sum = badges.reduce(function (a, b) { 
				return a + parseInt(b["value"]);
			}, 0);
			this.api().column(1).footer().innerHTML = sum;
		}
	});

	$('#table_basicskills').DataTable({
		data: basicskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(basicskills, 'settings_basicskills')
		},{ 
			targets: 2,
			createdCell: CreatedCellActiveTemplate(basicskills, 'settings_basicskills')
		}],
		columns: [
			{ data: 'key', title: "Basic Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_splashskills').DataTable({
		data: splashskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(splashskills, 'settings_splashskills')
		}],
		columns: [
			{ data: 'key', title: "Splash Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_sniperskills').DataTable({
		data: sniperskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(sniperskills, 'settings_sniperskills')
		}],
		columns: [
			{ data: 'key', title: "Sniper Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_poisonskills').DataTable({
		data: poisonskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(poisonskills, 'settings_poisonskills')
		}],
		columns: [
			{ data: 'key', title: "Poison Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_demoskills').DataTable({
		data: demoskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(demoskills, 'settings_demoskills')
		}],
		columns: [
			{ data: 'key', title: "Demo Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_scatterskills').DataTable({
		data: scatterskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(scatterskills, 'settings_scatterskills')
		}],
		columns: [
			{ data: 'key', title: "Scatter Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
			ColumnCheckboxTemplate('active', 'Unlocked?', '50px'),
		],
	});

	$('#table_cashskills').DataTable({
		data: cashskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(cashskills, 'settings_cashskills')
		}],
		columns: [
			{ data: 'key', title: "Cash Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_pierceskills').DataTable({
		data: pierceskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(pierceskills, 'settings_pierceskills')
		}],
		columns: [
			{ data: 'key', title: "Pierce Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_swordskills').DataTable({
		data: swordskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(swordskills, 'settings_swordskills')
		}],
		columns: [
			{ data: 'key', title: "Sword Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_fireskills').DataTable({
		data: fireskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(fireskills, 'settings_fireskills')
		}],
		columns: [
			{ data: 'key', title: "Fire Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});

	$('#table_lightningskills').DataTable({
		data: lightningskills,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: 1,
			createdCell: CreatedCellTemplate(lightningskills, 'settings_lightningskills')
		}],
		columns: [
			{ data: 'key', title: "Lightning Skill Tree", width: '200px' },
			ColumnNumberTemplate('value', 'Value', '50px'),
		],
	});
}