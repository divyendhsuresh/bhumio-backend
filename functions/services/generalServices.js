const { google } = require('googleapis');

async function listFiles(authClient) {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length === 0) {
        return { "message": "No files found." }
    }
    return files.map((file) => {
        return { "name": file.name, "ID": file.id }
    });
}


async function getDataByFirstName(auth, firstName, hospitalSpreadSheetID) {
    // console.log({ hospitalSpreadSheetID });
    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientNameIndex = headerRow.indexOf('first_name');
        const filteredData = values.filter((row) => row[patientNameIndex] === firstName);
        // console.log(filteredData);
        return filteredData;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

async function getDataByLastName(auth, lastName, hospitalSpreadSheetID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const patientNameIndex = headerRow.indexOf('last_name');
        const filteredData = values.filter((row) => row[patientNameIndex] === lastName);
        return filteredData;
    } catch (err) {
        return err;
    }
}


async function getDataByEmail(auth, email, hospitalSpreadSheetID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const emailIndex = headerRow.indexOf('email');
        const filteredData = values.filter((row) => row[emailIndex] === email);
        return filteredData;
    } catch (err) {
        return err;
    }
}


async function getDataByPhone(auth, phone, hospitalSpreadSheetID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const phoneIndex = headerRow.indexOf('phone');
        const filteredData = values.filter((row) => row[phoneIndex] === phone);
        return filteredData;
    } catch (err) {
        return err;
    }
}

async function getDataByLocation(auth, location, hospitalSpreadSheetID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const locationIndex = headerRow.indexOf('location');
        const filteredData = values.filter((row) => row[locationIndex] === location);
        return filteredData;
    } catch (err) {
        return err;
    }
}


async function getDataByAddress(auth, address, hospitalSpreadSheetID) {

    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId: hospitalSpreadSheetID,
            range: 'patient!A:I'
        });

        const values = result.data.values;
        const headerRow = values[0];
        const addressIndex = headerRow.indexOf('address');
        const filteredData = values.filter((row) => row[addressIndex] === address);
        return filteredData;
    } catch (err) {
        return err;
    }
}

module.exports = {
    listFiles, getDataByFirstName,
    getDataByLastName, getDataByPhone,
    getDataByEmail, getDataByLocation, getDataByAddress
}

