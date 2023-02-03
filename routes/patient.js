const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/patient");
const validator = require("./../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const advancedResults = require ("./../middlewares/advancedResult");
require('./../model/patient');
const patient= mongoose.model('patient');
//include other resource routers
const appointmentRouter = require('./appointment');


const router = express.Router();


// Re-route into other resource routers 
router.use('/patient/:patientId/appointment',controller.edelo,appointmentRouter)


router.route("/patient")
.get(advancedResults(patient),controller.getPatients)
.post(validation.patientPost,validator,controller.createPatient)


router.route("/patient/:id")
.get(validation.paramIdInt,validator,controller.getPatient)
.delete(validation.paramIdInt,validator,controller.deletePatient)
.patch(validation.patientUpdate,validator,controller.updatePatient)

module.exports=router;