import express from "express";
import { createAppointmentForPatient, deleteAppointment, getAppointmentById, getAppointmentsByDoctorId, getAppointmentsByPatientId, updateAppointment } from "../controller/appointmentController.js";

const Router = express.Router();

Router.get('/:id',getAppointmentById)
Router.get('/doctor/:id',getAppointmentsByDoctorId)
Router.get('/patient/:id',getAppointmentsByPatientId)
Router.post('/',createAppointmentForPatient)
Router.patch('/:id',updateAppointment);
Router.delete('/:id',deleteAppointment);

export default Router;