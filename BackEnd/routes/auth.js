import express from "express";
import { doctorSignUp, patientSignUp, radiologistSignUp, radiologyCenterSignUp } from "../auth/signup.js";
import { login} from "../auth/login.js";
const Router = express.Router();

Router.post('/patient/signup', patientSignUp)
Router.post('/doctor/signup', doctorSignUp);
Router.post('/radiologist/signup', radiologistSignUp);
Router.post('/radiologyCenter/signup', radiologyCenterSignUp);

Router.post('/login', login);

export default Router