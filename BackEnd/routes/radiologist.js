import express from "express";
import { getAllRadiologist, getPatientsByRadiologistId, getRadiologistById, updateRadiologist } from "../controller/radiologistController.js";

const Router = express.Router();

Router.get('/', getAllRadiologist)
Router.get('/:id',getRadiologistById)
Router.patch('/:id',updateRadiologist)
Router.get('/:id/patients',getPatientsByRadiologistId)

export default Router