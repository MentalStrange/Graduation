import express from 'express'
import { getScanByPatientId } from '../controller/scanController.js';

const Router = express.Router()

Router.get('/patient/:id',getScanByPatientId);



export default Router