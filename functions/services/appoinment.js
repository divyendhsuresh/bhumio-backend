const { google } = require('googleapis');

async function appendValuesAppointment(auth, details, hospitalSpreadSheetID) {

    let spreadsheetId = hospitalSpreadSheetID;
    // convert to const as should not chnage
    const range = 'appointment!A:E';
    const valueInputOption = 'RAW'

    const service = google.sheets({ version: 'v4', auth });
    let values = [
        [details.appointmentID, details.patientID,
        details.physicianID, details.start_dt_time, details.next_dt_time],
        
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



