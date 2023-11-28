const { google } = require('googleapis');

async function appendValuesAppointment(auth, details) {

    let spreadsheetId = '1gFfp8mK461sD2BosklqxX-_xE60Td1mplQrVM6D7-M4';
    let range = 'appointment!A:E';
    let valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [`${details.appointmentID}`, `${details.patientID}`,
        `${details.physicianID}`, `${details.start_dt_time}`, `${details.next_dt_time}`]
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


module.exports = { appendValuesAppointment }



