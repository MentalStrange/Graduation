import express from "express";
import { deleteDoctor, getAllDoctor, getDoctorById, getTopDoctors, updateDoctor } from "../controller/doctorController.js";
import { getAvailableTimeSlots } from "../controller/appointmentController.js";

const Router = express.Router();

Router.get('/',getAllDoctor)
Router.get('/:id',getDoctorById)
Router.get('/topDoctors',getTopDoctors)
Router.patch('/:id',updateDoctor)
Router.delete('/:id',deleteDoctor)
Router.get('/appointment/availableTimeSlots/:id',getAvailableTimeSlots);

export default Router;