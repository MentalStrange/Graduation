import express from "express";
import { createPrescription, deletePrescription, getAllPrescription, getPrescriptionByDoctor, getPrescriptionById, getPrescriptionByPatient, updatePrescription } from "../controller/prescriptionController.js";

const Router = express.Router();

Router.get('/',getAllPrescription)
Router.get('/:id',getPrescriptionById)
Router.get('/patient/:id',getPrescriptionByPatient);
Router.get('/doctor/:id',getPrescriptionByDoctor);
Router.post('/',createPrescription);
Router.patch('/:id',updatePrescription)
Router.delete('/:id',deletePrescription)

export default Router