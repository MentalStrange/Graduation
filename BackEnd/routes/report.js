import express from "express";
import { createReport, deleteReport, getAllReports, getReportByDoctor, getReportById, getReportByPatient, getReportByRadiologist, getReportByRadiologyCenter, updateReport } from "../controller/reportController.js";

const Router = express.Router();

Router.get('/',getAllReports)
Router.get('/:id',getReportById)
Router.get("/patient/:id",getReportByPatient)
Router.get('/doctor/:id',getReportByDoctor)
Router.get('/radiologist/:id',getReportByRadiologist)
Router.get('/radiologyCenter/:id',getReportByRadiologyCenter)
Router.post('/', createReport)
Router.patch('/:id',updateReport);
Router.delete('/:id',deleteReport)

export default Router