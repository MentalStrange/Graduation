import express from "express";
import { getAllRadiologist, getRadiologistById, updateRadiologist } from "../controller/radiologiestController.js";

const Router = express.Router();

Router.get('/', getAllRadiologist)
Router.get('/:id',getRadiologistById)
Router.patch('/:id',updateRadiologist)

export default Router