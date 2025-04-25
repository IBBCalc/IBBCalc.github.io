var storagename = 'brickHealthCalculator';
var data = GetItem(storagename, defaultbrickhealth);
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
	window.localStorage.setItem(key, JSON.stringify(obj));
}

function handleNewRow(e) {
	var newobj = {
		'level': ''
	};
	data.push(newobj);
	console.log('Added new row')
	StoreItem(storagename, data);
	$('#table_brickhealth').DataTable().row.add(newobj).draw();
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
		data[r][Object.keys(data[r])[c]] = e.target.value === '' ? '' : e.target.value;
		console.log('Row changed: ', data[r])
		StoreItem(storagename, data);
	}
}

// %%%%%%%%%%%%%%%%%%%%%%% Created Cell Templates %%%%%%%%%%%%%%%%%%%%%%%

function RefreshDataCells() {
	var datacells = [1,2,3,4];
	$('#table_brickhealth').DataTable().cells(null, datacells).invalidate();
}

function CreatedNumberTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateNumber(data, e);
			RefreshDataCells();
		});
	}
}

function CreatedTextTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('change', function(e) {
			UpdateText(data, e);
			RefreshDataCells();
		});
	}
}

function CreatedDeleteTemplate(data) {
	return function(cell, celldata, rowdata, rowindex, colindex) {
		cell.addEventListener('click', function(e) {
			var r = e.currentTarget._DT_CellIndex.row;
			console.log('Delete row: ', data[r])
			data.splice(r, 1)
			StoreItem(storagename, data);
			$('#table_brickhealth').DataTable().row(this).remove().draw()
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
				return '<input type="number" step="1" value="' + data + '">';
			}
			return data;
		},  
	};
}

function ColumnTextTemplate(data, title, width) {
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
				return '<input type="text" value="' + data + '">';
			}
			return data;
		},  
	};
}

function ColumnDataTemplate(func, title, width, format) {
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

function ColumnDeleteTemplate(title, width) {
	return { 
		title: title, 
		width: width, 
		defaultContent: '',
		render: function(data, type, row, meta) {
			if ( type === 'display' ) {
				return '<a class="abutton" href="#">X</a>';
			}
			return data;
		},
	};
}

// %%%%%%%%%%%%%%%%%%%%%%% Build Page %%%%%%%%%%%%%%%%%%%%%%%

function BuildPage() {
	$(document).ready(function() {
		//$("input[type=number]").focus().select();
	});
	
	BuildTable();
}

function BuildTable() {
	$('#table_brickhealth').DataTable({
		data: data,
		info: false,
		searching: false,
		ordering: false,
		paging: false,
		autoWidth: false,
		deferRender: true,
		columnDefs: [{ 
			targets: [0],
			createdCell: CreatedTextTemplate(data)
		},{
			targets: [5],
			createdCell: CreatedDeleteTemplate(data)
		}],
		columns: [
			ColumnTextTemplate('level', 'Level', '120px'),
			ColumnDataTemplate(CalculateGreenHP, 'Brick HP', '80px', true),
			ColumnDataTemplate(CalculateHexHP, 'Hex HP', '80px', true),
			ColumnDataTemplate(CalculateHexShieldHP, 'Shielded Hex eHP', '80px', true),
			ColumnDataTemplate(CalculateHexShieldPenHP, 'Shielded Shield Pen Hex eHP', '80px', true),
			//ColumnDataTemplate(CalculateRatio, 'Ratio (to X)', '80px', true),
			ColumnDeleteTemplate('', '30px'),
		],
	});
}

// %%%%%%%%%%%%%%%%%%%%%%% Calculations %%%%%%%%%%%%%%%%%%%%%%%

function CalculateGreenHP(row, rowindex) {
	if (row === undefined || row.level === undefined || row.level === null) {
		return null;
	}
	
	var value = UnFormatNumber(row.level);
	if (isNaN(value)) {
		return null;
	}
	
	return CalculateBrickHP(value);
}

function CalculateHexHP(row, rowindex) {
	if (row === undefined || row.level === undefined || row.level === null) {
		return null;
	}
	
	var value = UnFormatNumber(row.level);
	if (isNaN(value)) {
		return null;
	}
	
	return CalculateBrickHP(value) * 25;
}

function CalculateHexShieldHP(row, rowindex) {
	if (row === undefined || row.level === undefined || row.level === null) {
		return null;
	}
	
	var value = UnFormatNumber(row.level);
	if (isNaN(value)) {
		return null;
	}
	
	if (value < 600) {
		return null;
	}
	
	return CalculateBrickHP(value) * 25 * 500;
}

function CalculateHexShieldPenHP(row, rowindex) {
	if (row === undefined || row.level === undefined || row.level === null) {
		return null;
	}
	
	var value = UnFormatNumber(row.level);
	if (isNaN(value)) {
		return null;
	}
	
	if (value < 600) {
		return null;
	}
	
	var shieldpen = settings.cards.find(a => a.key === "Shield Pen.");
	var card = shieldpen.card.value1[shieldpen.card.level];
	var mastery = shieldpen.mastery.value[shieldpen.mastery.level];
	return CalculateBrickHP(value) * 25 * 500 / ((card === undefined ? 1 : card) * (mastery === undefined ? 1 : mastery));
}

function CalculateBrickHP(level) {
	// Find cumulative multiplier for the given level
	var cumulative = brickmult.findLast(a => a.level <= level).cumulative;
	if (level > 300000) {
		var jumps = (level - 200000) / 100000;
		var extraMult = Math.pow(1.4, jumps);

		// Not sure about this, this was what dev explained, not what is definitely in the code
		// Though this only happens after stage 130m ish, so not super relevant anyway
		if (extraMult == Infinity || extraMult > 9e201) {
			extraMult = 9e201;
		}
		
		cumulative *= extraMult < 1 ? 1 : extraMult;
	}
	
	var health = Math.pow(level, 1.32) * cumulative;
	return health;
}