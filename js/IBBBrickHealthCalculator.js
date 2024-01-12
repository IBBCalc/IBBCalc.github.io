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

// %%%%%%%%%%%%%%%%%%%%%%% Created Cell Templates %%%%%%%%%%%%%%%%%%%%%%%

function RefreshDataCells() {
	var datacells = [1,2,3];
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
				return '<input type="text" step="1" value="' + data + '">';
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
			createdCell: CreatedNumberTemplate(data)
		}],
		columns: [
			ColumnNumberTemplate('level', 'Level', '120px'),
			ColumnDataTemplate(CalculateGreenHP, 'Brick HP', '80px', true),
			ColumnDataTemplate(CalculateHexHP, 'Hex HP', '80px', true),
			ColumnDataTemplate(CalculateHexShieldHP, 'Shielded Hex eHP', '80px', true),
			ColumnDataTemplate(CalculateHexShieldPenHP, 'Shielded Shield Pen Hex eHP', '80px', true),
			//ColumnDataTemplate(CalculateRatio, 'Ratio (to X)', '80px', true),
		],
	});
}

// %%%%%%%%%%%%%%%%%%%%%%% Calculations %%%%%%%%%%%%%%%%%%%%%%%

function CalculateGreenHP(row, rowindex) {
	if (row === undefined || row.level === null) {
		return null;
	}
	
	return CalculateBrickHP(row.level);
}

function CalculateHexHP(row, rowindex) {
	if (row === undefined || row.level === null) {
		return null;
	}
	
	return CalculateBrickHP(row.level) * 25;
}

function CalculateHexShieldHP(row, rowindex) {
	if (row === undefined || row.level === null) {
		return null;
	}
	
	return CalculateBrickHP(row.level) * 25 * 500;
}

function CalculateHexShieldPenHP(row, rowindex) {
	if (row === undefined || row.level === null) {
		return null;
	}
	
	return CalculateBrickHP(row.level) * 25 * 500 / settings.cards.find(a => a.key === "Shield Pen.").value;
}

function CalculateBrickHP(level) {
	// Find cumulative multiplier for the given level
	var cumulative = brickmult.findLast(a => a.level <= level).cumulative;
	var health = Math.pow(level, 1.32) * cumulative;
	return health;
}