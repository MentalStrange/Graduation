import express from "express";
import { deleteRadiologyCenter, getAllRadiologyCenter, getRadiologyCenterById, updateRadiologyCenter } from "../controller/radiologyCenterController.js";
import { createAppointmentForPatientRadiologyCenter, deleteRadiologyCenterAppointment, getAvailableTimeSlots, getRadiologyCenterAppointment, getRadiologyCenterAppointmentById, getRadiologyCenterAppointmentsForPatient, updateAppointmentStatus, updateRadiologyCenterAppointment } from "../controller/radiologyCenterAppointmentController.js";

const Router = express.Router();

Router.get('/',getAllRadiologyCenter);
Router.get('/:id',getRadiologyCenterById);
Router.patch('/:id',updateRadiologyCenter)
Router.delete('/:id',deleteRadiologyCenter)

Router.get('/appointment',getRadiologyCenterAppointment)
Router.get('/appointment/:id',getRadiologyCenterAppointmentById)
Router.get('/appointment/patient/:id',getRadiologyCenterAppointmentsForPatient)
Router.post('/appointment',createAppointmentForPatientRadiologyCenter);
Router.patch('/appointment/status',updateAppointmentStatus);
Router.get('/appointment/availableTimeSlots/:id',getAvailableTimeSlots);
Router.patch('/appointment/:id',updateRadiologyCenterAppointment);
Router.delete('/appointment/:id',deleteRadiologyCenterAppointment)

export default Router