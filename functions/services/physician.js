const { google } = require('googleapis');

async function appendValuesPhysician(auth, details, hospitalSpreadSheetID) {

    let spreadsheetId = hospitalSpreadSheetID;
    let range = 'physician!A:D';
    let valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [details.employeeid, details.physicianName,
        details.position, details.physicianPhone]
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

async function updatePhysicianDetailsByID(auth, updatedData, hospitalSpreadSheetID) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = hospitalSpreadSheetID;
    const range = 'physician!A:D';

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
        const employeeIDIndex = headerRow.indexOf('employeeid');

        if (employeeIDIndex === -1) {
            return { "message": "Column employeeid not found." };
        }

        const rowIndex = values.findIndex((row) => row[employeeIDIndex] === updatedData.employeeid);
        // console.log({ "rowIndex": rowIndex });

        if (rowIndex === -1) {
            // console.log(`doctor with employeeID ${updatedData.employeeid} not found.`);
            return { "message": `doctor with employeeID ${updatedData.employeeid} not found.` };
        }

        const updateResponse = await sheets.spreadsheets.values.update({
            spreadsheetId: hospitalSpreadSheetID,
            range: `physician!A${rowIndex + 1}:J${rowIndex + 1}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                // string literal requreid here?
                values: [
                    [updatedData.employeeid, updatedData.physicianName, updatedData.position, updatedData.physicianPhone]
                ]
            },
        });
        return { "message": "Updated successfully" }
    } catch (err) {
        // console.error('Error updating patient details:', err);
        return err
    }
}

module.exports = { appendValuesPhysician, updatePhysicianDetailsByID }