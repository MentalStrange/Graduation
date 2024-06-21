import express from 'express'
import { createScan, getScanByPatientId, getScansByRadiologistId, getScansByRadiologyCenterId, updateScan } from '../controller/scanController.js';

const Router = express.Router()

Router.get('/patient/:id',getScanByPatientId);
Router.post('/', createScan);
Router.get('/radiologyCenter/:id', getScansByRadiologyCenterId);
Router.get('/radiologist/:id',getScansByRadiologistId);
Router.patch('/:id',updateScan);



export default Router