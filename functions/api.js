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

router.post('/savedetails', async (req, res) => {
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

router.post('/searchpatients', async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        const authResponse = await auth.authorize();
        const getByFirstNameResponse = await generalServices.getDataByFirstName(authResponse, data.firstName);
        const getByLastNameResponse = await generalServices.getDataByLastName(authResponse, data.lastName);
        const getDataByAddressResponse = await generalServices.getDataByAddress(authResponse, data.address);
        const getDataByLocationResponse = await generalServices.getDataByLocation(authResponse, data.location);
        const getDataByEmailResponse = await generalServices.getDataByEmail(authResponse, data.email);
        const getDataByPhoneResponse = await generalServices.getDataByPhone(authResponse, data.phone)
        res.send({
            "getByFirstNameResponse": getByFirstNameResponse,
            "getByLastNameResponse": getByLastNameResponse,
            "getDataByAddressResponse": getDataByAddressResponse,
            "getDataByLocationResponse": getDataByLocationResponse,
            "getDataByEmailResponse": getDataByEmailResponse,
            "getDataByPhoneResponse": getDataByPhoneResponse,
        });

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



