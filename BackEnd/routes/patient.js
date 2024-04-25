import express from "express";
import {  deletePatient,  getAllPatients, getPatientById, updatePatient } from "../controller/patientController.js";

const Router = express.Router();

Router.get('/',getAllPatients)
Router.get('/:id',getPatientById)
Router.patch('/:id',updatePatient)
Router.delete('/:id',deletePatient)

export default Router