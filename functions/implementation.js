const { google } = require('googleapis');


async function listFiles(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

// authorize().then(listFiles).catch(console.error);


async function listMajors(auth) {
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

// authorize().then(listMajors).catch(console.error);


async function getValues(auth) {
  // const {GoogleAuth} = require('google-auth-library');
  // const {google} = require('googleapis');

  // const auth = new GoogleAuth({
  //   scopes: 'https://www.googleapis.com/auth/spreadsheets',
  // });
  let spreadsheetId_ = '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4';
  let range_ = 'appointment!A:E';
  const service = google.sheets({ version: 'v4', auth });
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId_,
      range_,
    });
    const numRows = result.data.values ? result.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    console.log(result)
    return { 'data': result.data }
  } catch (err) {
    console.log(err);
    return {
      'message': err.message,
      'stacktrace': err.stack
    }
  }
}




