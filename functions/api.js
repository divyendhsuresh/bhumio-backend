const express = require('express');
const app = express();
const serverless = require('serverless');
const router = express.Router();
const port = 8000
const auth = require("./auth");
const bodyParser = require('body-parser')
const patient = require("./services/patient");
const appointment = require("./services/appoinment");
const physician = require("./services/physician");
const prescribes = require("./services/prescribes");
const generalServices = require("./services/generalServices");

app.use(express.json())
app.use(router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

router.get('/', (req, res) => {
    res.send("app is running")
})

router.get('/listfiles', (req, res) => {
    auth.authorize().then((response) => {
        func.getValues(response).then((values) => {
            // console.log({ values })
            res.send(values)
        });
    })
        .catch((err) => {
            console.log({ err });
        })
})

router.post('/details', async (req, res) => {
    try {
        let details = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const appendResponse = await appointment.appendValuesAppointment(authResponse, details);
        const patientResponse = await patient.appendValuesPatient(authResponse, details);
        const prescribesResponse = await prescribes.appendValuesPrescribe(authResponse, details);
        const physicianResponse = await physician.appendValuesPhysician(authResponse, details);
        res.send("Details Inserted");
    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
});

router.post('/getdata', async (req, res) => {
    try {
        let patientID = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const getResponse = await appointment.updateSheet(authResponse, patientID);
        res.send(getResponse);
    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
});

router.post('/getdata2', async (req, res) => {
    try {
        let data = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const getResponse = await appointment.batchGetValues(authResponse, data.patientID);
        res.send(getResponse);
    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
});


router.post('/getpatients', async (req, res) => {
    try {
        let data = req.body;
        const authResponse = await auth.authorize();
        const getResponse = await generalServices.getDataByName(authResponse, data.patientName);
        res.send(getResponse);

    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
})


router.post('/updatepatients', async (req, res) => {
    try {
        let UpdateData = req.body;
        const authResponse = await auth.authorize();
        const getResponse = await generalServices.updateDataByID(authResponse, UpdateData.patientID, UpdateData);
        res.send(getResponse);

    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
})

router.post('/updatedetails', async (req, res) => {
    try {
        let details = req.body;
        // console.log(details);
        const authResponse = await auth.authorize();
        const updatedPatientResponse = await patient.updatePatientdetailsByID(authResponse, details);
        const updatedPrescribesResponse = await prescribes.updatePrescribesDetailsByID(authResponse, details);
        const updatedphysicianResponse = await physician.updatePhysicianDetailsByID(authResponse, details);
        res.send("Details Updated");
    } catch (err) {
        console.error({ err });
        res.status(500).send('Internal Server Error');
    }
});