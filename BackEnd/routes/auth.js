import express from "express";
import { doctorSignUp, patientSignUp, radiologistSignUp, radiologyCenterSignUp } from "../auth/signup.js";
import { doctorLogin, patientLogin, radiologistLogin, radiologyCenterLogin } from "../auth/login.js";

const Router = express.Router();

Router.post('/patient/signup', patientSignUp)
Router.post('/doctor/signup', doctorSignUp);
Router.post('/radiologist/signup', radiologistSignUp);
Router.post('/radiologyCenter/signup', radiologyCenterSignUp);

Router.post('/patient/login', patientLogin);
Router.post('/doctor/login', doctorLogin);
Router.post('/radiologist/login', radiologistLogin);
Router.post('/radiologyCenter/login', radiologyCenterLogin);

export default Router