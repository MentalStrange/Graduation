import express from 'express'
import { createScan, getScanByPatientId, getScanByReportId, getScansByRadiologistId, getScansByRadiologyCenterId, updateScan } from '../controller/scanController.js';

const Router = express.Router()

Router.get('/patient/:id',getScanByPatientId);
Router.post('/', createScan);
Router.get('/radiologyCenter/:id', getScansByRadiologyCenterId);
Router.get('/radiologist/:id',getScansByRadiologistId);
Router.patch('/:id',updateScan);
Router.get('/report/:id',getScanByReportId)



export default Router