const { google } = require('googleapis');

async function appendValuesPatient(auth, details, hospitalSpreadSheetID) {

    let spreadsheetId = hospitalSpreadSheetID;
    let range = 'patient!A:J';
    let valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [`${details.ssn}`, `${details.first_name}`,
        `${details.last_name}`, `${details.address}`,
        `${details.location}`, `${details.email}`,
        `${details.phone}`, `${details.pcp}`,
        `${details.patientID}`, `${details.age}`]
        ,
        // Additional rows ...
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
        // console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function updatePatientdetailsByID(auth, updatedData, hospitalSpreadSheetID) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = hospitalSpreadSheetID;
    const range = 'patient!A:J';

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
        // console.log({ "patientIDIndex": patientIDIndex });
        // console.log({ "patientID": patientID });
        // return

        if (patientIDIndex === -1) {
            // console.log('Column "PatientID" not found.');
            return { "message": "Column PatientID not found." };
        }

        const filteredData = values.filter((row) => row[patientIDIndex] === updatedData.patientID);
        // console.log({ "filteredData": filteredData });

        const rowIndex = values.findIndex((row) => row[patientIDIndex] === updatedData.patientID);
        // console.log({ "rowIndex": rowIndex });

        if (rowIndex === -1) {
            console.log(`Patient with PatientID ${patientID} not found.`);
            return { "message": "Patient with PatientID ${patientID} not found." };
        }

        //update works here
        const updateResponse = await sheets.spreadsheets.values.update({
            spreadsheetId: hospitalSpreadSheetID,
            range: `patient!A${rowIndex + 1}:J${rowIndex + 1}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [`${updatedData.ssn}`, `${updatedData.first_name}`, `${updatedData.last_name}`,
                    `${updatedData.address}`, `${updatedData.location}`, `${updatedData.email}`,
                    `${updatedData.phone}`, `${updatedData.pcp}`, `${updatedData.patientID}`, `${updatedData.age}`]
                ]
            },
        });
        // console.log(updateResponse.data.updatedCells);
        // console.log(updateResponse);
        // console.log(`${updateResponse.data.updatedCells} cells updated.`);
        return "sucess"
    } catch (err) {
        console.error('Error updating patient details:', err);
        throw err;
    }
}


module.exports = { appendValuesPatient, updatePatientdetailsByID }

