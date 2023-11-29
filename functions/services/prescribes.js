const { google } = require('googleapis');

async function appendValuesPrescribe(auth, details, hospitalSpreadSheetID) {

    let spreadsheetId = hospitalSpreadSheetID;
    let range = 'prescribes!A:D';
    let valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [details.physicianID, details.patientID, details.description, details.dose]
        ,
    ];
    const resource = {
        values,
    };
    try {
        const result = await service.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });
        return result;
    } catch (err) {
        // console.log(err);
        return err;
    }
}


async function updatePrescribesDetailsByID(auth, updatedData, hospitalSpreadSheetID) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = hospitalSpreadSheetID;
    const range = 'prescribes!A:D';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // console.log(response.data);

        const values = response.data.values;

        if (!values || values.length === 0) {
            // console.log('No data found.');
            return { "message": "No data found." };
        }

        const headerRow = values[0];
        const patientIDIndex = headerRow.indexOf('PatientID');

        if (patientIDIndex === -1) {
            // console.log('Column "PatientID" not found.');
            return { "message": "Column PatientID not found." };
        }

        const rowIndex = values.findIndex((row) => row[patientIDIndex] === updatedData.patientID);
        // console.log({ "rowIndex": rowIndex });

        if (rowIndex === -1) {
            // console.log(`Patient with PatientID ${updatedData.patientID} not found.`);
            return { "message": `Patient with PatientID ${updatedData.patientID} not found.` };
        }

        const updateResponse = await sheets.spreadsheets.values.update({
            spreadsheetId: hospitalSpreadSheetID,
            range: `prescribes!A${rowIndex + 1}:J${rowIndex + 1}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [updatedData.physicianID, updatedData.patientID,
                    updatedData.description, updatedData.dose]
                ]
            },
        });

        return { "message": "Updated successfully" };
    } catch (err) {
        return err;
    }
}


module.exports = { appendValuesPrescribe, updatePrescribesDetailsByID }