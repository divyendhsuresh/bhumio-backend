const { google } = require('googleapis');

async function appendValuesAppointment(auth, details) {

    let spreadsheetId = '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4';
    let range = 'appointment!A:E';
    let valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [`${details.appointmentID}`, `${details.patientID}`, `${details.physicianID}`, `${details.start_dt_time}`, `${details.next_dt_time}`]
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
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function listAppointmentDetails(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
        range: 'appointment!A:E',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    rows.forEach((row) => {
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`${row[0]},${row[1]},${row[2]},${row[3]}, ${row[4]}`);
    });
}


async function batchGetValues(auth, patientID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'appointment!A:E'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientIDIndex = headerRow.indexOf('patientID');
        const filteredData = values.filter((row) => row[patientIDIndex] === patientID);
        console.log(filteredData);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function updateSheet(auth, patientID) {
    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
        [`${patientID}`]
    ];

    const resource = {
        values: values,
    };

    try {
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId: '1PImXlsj4IrmdjXBYdKAxwNtYsM3xlRWuQdgNIcu0o7U',
            range: 'appointment!A:E',
            valueInputOption: 'RAW',
            resource,
        });
        // console.log(`${response.data.updatedCells} cells updated.`);
        // console.log("//////////");
        // console.log(response.data);
        // console.log("//////////");
        return response.data;
    } catch (err) {
        console.error('Error updating sheet:', err);
        throw err;
    }
}


module.exports = { appendValuesAppointment, updateSheet, batchGetValues }