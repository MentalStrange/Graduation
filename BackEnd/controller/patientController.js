import { patientDetails, patientTransformation } from "../format/transformation.js";
import Patient from "../model/patientModel.js";
import Prescription from "../model/prescriptionModel.js";
import bcrypt from "bcrypt";
export const updatePatient = async (req,res) => {
  const patientId = req.params.id
  const patient = req.body
  try {
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
      const newPatient = await Patient.findByIdAndUpdate(patientId, patient);
      return res.status(200).json({
        status:"success",
        data:patientTransformation(newPatient)  
      })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getAllPatients = async (req,res) => {
  try {
    const patients = await Patient.find();
    if(patients){
      const transformPatient = patients.map((patient) => {
        return patientTransformation(patient)
      })
      return res.status(200).json({
        status:"success",
        data:transformPatient
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPatientById = async (req,res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if(patient){
      return res.status(200).json({
        status:"success",
        data:patientTransformation(patient)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deletePatient = async (req,res) => {
  const patientId = req.params.id;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if(deletedPatient){
      return res.status(200).json({
        status:"success",
        data:patientTransformation(deletedPatient)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPatientByDoctorId = async (req,res) => {
  const doctorId = req.params.id;
  try {
    const prescriptions = await Prescription.find({doctor:doctorId});
    if(prescriptions){
      const patientsId = prescriptions.map((prescription) => {
        return prescription.patient
      })
      const patients = await Patient.find({_id:{$in:patientsId}});
      const transformPatient = patients.map((patient) => {
        return patientTransformation(patient)
      })
      return res.status(200).json({
        status:"success",
        data:transformPatient
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPatientDetails = async (req,res) => {
  const patientId = req.params.id;
  try {
    const patientData = await patientDetails(patientId);
    return res.status(200).json({
      status:"success",
      data:patientData
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}