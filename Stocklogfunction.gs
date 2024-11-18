function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('Daily Stock Entry');
}

// Function to fetch the next Serial Number
function getNextSerialNo() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stock Log - Master");
  if (!sheet) throw new Error("Sheet 'Stock Log - Master' not found.");

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1; // Start at 1 if no data

  const lastSerialNo = sheet.getRange(lastRow, 1).getValue(); // Assuming Serial No is in the first column
  return lastSerialNo ? lastSerialNo + 1 : 1;
}

// Function to add form entry data to the sheet
function addEntry(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stock Log - Master");
  if (!sheet) throw new Error("Sheet 'Stock Log - Master' not found.");

  // Validate mandatory fields
  if (!data.serialNo || !data.Date || !data.Week || !data.Month || !data.depotName || !data.GRNno || !data.PhysicalStockorOpeningstock || !data.TotalStockafterGRNQty) {
    throw new Error("All mandatory fields must be filled out.");
  }

  // Material-specific validation
  if (data.adblueDef === "Yes" && (!data.DEFGRNQty || isNaN(data.DEFGRNQty))) {
    throw new Error("DEF GRN Quantity is mandatory when ADBLUE/DEF is selected as 'Yes'.");
  }

  if (data.engineOil === "Yes" && (!data.ENGINEOILGRNQty || isNaN(data.ENGINEOILGRNQty))) {
    throw new Error("Engine Oil GRN Quantity is mandatory when Engine Oil is selected as 'Yes'.");
  }

  if (data.coolant === "Yes" && (!data.COOLANTGRNQty || isNaN(data.COOLANTGRNQty))) {
    throw new Error("Coolant GRN Quantity is mandatory when Coolant is selected as 'Yes'.");
  }

  // Append data to the sheet
  sheet.appendRow([
    data.serialNo,
    data.Date,
    data.Week,
    data.Month,
    data.depotName,
    data.GRNno,
    data.adblueDef,
    data.DEFGRNQty || "",
    data.engineOil,
    data.ENGINEOILGRNQty || "",
    data.coolant,
    data.COOLANTGRNQty || "",
    data.PhysicalStockorOpeningstock,
    data.TotalStockafterGRNQty,
  ]);
}
