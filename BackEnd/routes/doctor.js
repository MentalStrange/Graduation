import express from "express";
import { deleteDoctor, getAllDoctor, getDoctorById, updateDoctor } from "../controller/doctorController.js";

const Router = express.Router();

Router.get('/',getAllDoctor)
Router.get('/:id',getDoctorById)
Router.patch('/:id',updateDoctor)
Router.delete('/:id',deleteDoctor)

export default Router;