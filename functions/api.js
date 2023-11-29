const express = require('express');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();
const port = 8000;
const auth = require("./auth");
const bodyParser = require('body-parser')
const patient = require("./services/patient");
const appointment = require("./services/appoinment");
const physician = require("./services/physician");
const prescribes = require("./services/prescribes");
const generalServices = require("./services/generalServices");

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())
//for local
// app.use(router);
//for hosting at netlify 
app.use('/.netlify/functions/api', router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

router.get('/', (req, res) => {
    // console.log(req.headers.hospital);
    res.send("app is running")
})

router.get('/listsheetdata', async (req, res) => {
    try {
        const authResponse = await auth.authorize();
        const IdResponse = await generalServices.listFiles(authResponse)
        // console.log(IdResponse);
        res.send({ IdResponse })
    } catch (err) {
        // console.error({ err });
        res.status(500).send('Internal Server Error');
    }
})

router.post('/savedetails', async (req, res) => {
    let hospitalSpreadSheetID = req.headers.hospital;
    try {
        let details = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const appendResponse = await appointment.appendValuesAppointment(authResponse, details, hospitalSpreadSheetID);
        const patientResponse = await patient.appendValuesPatient(authResponse, details, hospitalSpreadSheetID);
        const prescribesResponse = await prescribes.appendValuesPrescribe(authResponse, details, hospitalSpreadSheetID);
        const physicianResponse = await physician.appendValuesPhysician(authResponse, details, hospitalSpreadSheetID);
        res.send('Details Inserted');
    } catch (err) {
        // console.error({ err });
        res.status(500).send('Internal Server Error');
    }
});

router.post('/searchpatients', async (req, res) => {
    let hospitalSpreadSheetID = req.headers.hospital;
    try {
        let data = req.body;
        // console.log(data);
        const authResponse = await auth.authorize();
        const firstNameResult = await generalServices.getDataByFirstName(authResponse, data.firstName, hospitalSpreadSheetID);
        const lastNameResult = await generalServices.getDataByLastName(authResponse, data.lastName, hospitalSpreadSheetID);
        const addressResult = await generalServices.getDataByAddress(authResponse, data.address, hospitalSpreadSheetID);
        const locationResult = await generalServices.getDataByLocation(authResponse, data.location, hospitalSpreadSheetID);
        const emailResult = await generalServices.getDataByEmail(authResponse, data.email, hospitalSpreadSheetID);
        const phoneResult = await generalServices.getDataByPhone(authResponse, data.phone, hospitalSpreadSheetID)
        res.send({
            firstNameResult,
            lastNameResult,
            addressResult,
            locationResult,
            emailResult,
            phoneResult
        });

    } catch (err) {
        // console.error({ err });
        res.status(500).send('Internal Server Error');
    }
})

router.post('/updatedetails', async (req, res) => {
    let hospitalSpreadSheetID = req.headers.hospital;
    try {
        let details = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const updatedPatientResponse = await patient.updatePatientdetailsByID(authResponse, details, hospitalSpreadSheetID);
        const updatedPrescribesResponse = await prescribes.updatePrescribesDetailsByID(authResponse, details, hospitalSpreadSheetID);
        const updatedphysicianResponse = await physician.updatePhysicianDetailsByID(authResponse, details, hospitalSpreadSheetID);
        res.send(
            updatedPatientResponse,
            updatedPrescribesResponse,
            updatedphysicianResponse);
    } catch (err) {
        // console.error({ err });
        res.status(500).send('Internal Server Error', err);
    }
});

module.exports.handler = serverless(app)

