const { google } = require('googleapis');

async function getDataByFirstName(auth, first_name) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientNameIndex = headerRow.indexOf('first_name');
        const filteredData = values.filter((row) => row[patientNameIndex] === first_name);
        // console.log(filteredData);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function getDataByLastName(auth, last_name) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientNameIndex = headerRow.indexOf('last_name');
        const filteredData = values.filter((row) => row[patientNameIndex] === last_name);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function getDataByEmail(auth, email) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const emailIndex = headerRow.indexOf('email');
        const filteredData = values.filter((row) => row[emailIndex] === email);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function getDataByPhone(auth, phone) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const phoneIndex = headerRow.indexOf('phone');
        const filteredData = values.filter((row) => row[phoneIndex] === phone);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function getDataByLocation(auth, location) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const locationIndex = headerRow.indexOf('location');
        const filteredData = values.filter((row) => row[locationIndex] === location);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function getDataByAddress(auth, address) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const addressIndex = headerRow.indexOf('address');
        const filteredData = values.filter((row) => row[addressIndex] === address);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = { getDataByFirstName, getDataByLastName, getDataByPhone, getDataByEmail, getDataByLocation, getDataByAddress }




// async function listAppointmentDetails(auth) {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const res = await sheets.spreadsheets.values.get({
//         spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
//         range: 'appointment!A:E',
//     });
//     const rows = res.data.values;
//     if (!rows || rows.length === 0) {
//         console.log('No data found.');
//         return;
//     }
//     rows.forEach((row) => {
//         // Print columns A and E, which correspond to indices 0 and 4.
//         console.log(`${row[0]},${row[1]},${row[2]},${row[3]}, ${row[4]}`);
//     });
// }


// async function batchGetValues(auth, patientID) {

//     const service = google.sheets({ version: 'v4', auth });
//     try {
//         const result = await service.spreadsheets.values.get({
//             spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
//             range: 'appointment!A:E'
//         });

//         const values = result.data.values;
//         const headerRow = values[0];
//         const patientIDIndex = headerRow.indexOf('patientID');
//         const filteredData = values.filter((row) => row[patientIDIndex] === patientID);
//         console.log(filteredData);
//         return filteredData;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// }


// async function updateSheet(auth, patientID) {
//     const sheets = google.sheets({ version: 'v4', auth });

//     const values = [
//         [`${patientID}`]
//     ];

//     const resource = {
//         values: values,
//     };

//     try {
//         const response = await sheets.spreadsheets.values.update({
//             spreadsheetId: '1PImXlsj4IrmdjXBYdKAxwNtYsM3xlRWuQdgNIcu0o7U',
//             range: 'appointment!A:E',
//             valueInputOption: 'RAW',
//             resource,
//         });
//         // console.log(`${response.data.updatedCells} cells updated.`);
//         // console.log("//////////");
//         // console.log(response.data);
//         // console.log("//////////");
//         return response.data;
//     } catch (err) {
//         console.error('Error updating sheet:', err);
//         throw err;
//     }
// }
