import express from "express";
import {  deletePatient,  getAllPatients, getPatientByDoctorId, getPatientById, getPatientDetails, updatePatient } from "../controller/patientController.js";

const Router = express.Router();

Router.get('/',getAllPatients)
Router.get('/doctor/:id',getPatientByDoctorId)
Router.get('/:id',getPatientById)
Router.get('/:id/details',getPatientDetails)
Router.patch('/:id',updatePatient)
Router.delete('/:id',deletePatient)

export default Router