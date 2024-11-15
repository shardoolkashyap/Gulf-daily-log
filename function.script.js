function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('Daily Log Entry');
}

// Function to get the next Serial Number
function getNextSerialNo() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Daily Log - Master");
  const lastRow = sheet.getLastRow();
  const lastSerialNo = sheet.getRange(lastRow, 1).getValue(); // Assuming Serial No is in the first column
  return lastSerialNo ? lastSerialNo + 1 : 1;
}

// Function to add entry data to the sheet
function addEntry(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Daily Log - Master");

  sheet.appendRow([
    data.serialNo,
    data.openingDate,
    data.week,
    data.month,
    data.depotName,
    data.vehicleNo,
    data.reportingTime,
    data.openingKMReading,
    data.adblueDef,
    data.defLitresFilledQty,
    data.engineOil,
    data.engineOilQty,
    data.coolant,
    data.coolantQty,
    data.closingDate,
    data.closingKMReading,
    data.odometerPhoto,
    data.kmsRan || "", // KMs Ran can be empty
    data.refillPhoto,
    data.driverName,
    data.driverSignature,
    data.gulfSignature
  ]);
}
