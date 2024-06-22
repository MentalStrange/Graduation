import express from "express";
import { createAppointmentForPatient, deleteAppointment, getAppointmentById, getAppointmentsByDoctorId, getAppointmentsByPatientId, updateAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { getRadiologyCenterAppointment } from "../controller/radiologyCenterAppointmentController.js";

const Router = express.Router();

Router.get('/:id',getAppointmentById)
Router.get('/doctor/:id',getAppointmentsByDoctorId)
Router.get('/patient/:id',getAppointmentsByPatientId)
Router.get('/radiologyCenter/:id',getRadiologyCenterAppointment)
Router.patch('/status',updateAppointmentStatus)
Router.patch('/appointment/:id',updateAppointmentStatus)
Router.post('/',createAppointmentForPatient)
Router.patch('/:id',updateAppointment);
Router.delete('/:id',deleteAppointment);


export default Router;