import express from 'express';
import { getReceptionistById } from '../controller/receptionistController.js';


const Router = express.Router();

Router.get('/:id',getReceptionistById);

export default Router;