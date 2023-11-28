const { google } = require('googleapis');

async function getDataByName(auth, name) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4',
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientNameIndex = headerRow.indexOf('first_name');
        const filteredData = values.filter((row) => row[patientNameIndex] === name);
        // console.log(filteredData);
        return filteredData;
    } catch (err) {
        console.log(err);
        return err;
    }
}


module.exports = { getDataByName }