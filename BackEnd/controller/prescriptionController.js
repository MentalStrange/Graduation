import { prescriptionTransformation } from "../format/transformation.js";
import Doctor from "../model/doctorModel.js";
import Patient from "../model/patientModel.js";
import Prescription from "../model/prescriptionModel.js";

export const createPrescription = async (req,res) => {
  const prescription = req.body;
  try {
    const patient = await Patient.findById(prescription.patient);
    if(!patient){
      return res.status(404).json({
        status:"fail",
        message:"Patient Not Found"
      })
    }
    const doctor = await Doctor.findById(prescription.doctor);
    if(!doctor){
      return res.status(404).json({
        status:"fail",
        message:"Doctor Not Found"
      })
    }
    const newPrescription = await Prescription.create(prescription);
    res.status(200).json({
      status:"success",
      data:prescriptionTransformation(newPrescription)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const updatePrescription = async (req,res) => {
  const prescription = req.body;
  try {
    const newPrescription = await Prescription.findByIdAndUpdate(prescription._id,prescription);
    res.status(200).json({
      status:"success",
      data:prescriptionTransformation(newPrescription)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deletePrescription = async (req,res) => {
  const prescriptionId = req.params.id;
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(prescriptionId);
    if(deletedPrescription){
      return res.status(200).json({
        status:"success",
        data:prescriptionTransformation(deletedPrescription)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getAllPrescription = async (req,res) => {
  try {
    const prescriptions = await Prescription.find();
    if(prescriptions.length > 0){
      const transformPrescriptions = prescriptions.map((prescription) => {
        return prescriptionTransformation(prescription)
      })
      res.status(200).json({
        status:"success",
        data:transformPrescriptions
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPrescriptionById = async (req,res) => {
  const prescriptionId = req.params.id;
  try {
    const prescription = await Prescription.findById(prescriptionId);
    if(prescription){
      return res.status(200).json({
        status:"success",
        data:prescriptionTransformation(prescription)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPrescriptionByPatient = async (req,res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if(patient){
      const prescriptions = await Prescription.find({patient:patientId})
      if(prescriptions){
        const transformPrescriptions = prescriptions.map((prescription) => {
          return prescriptionTransformation(prescription)
        })
        return res.status(200).json({
          status:"success",
          data:transformPrescriptions
        })
      }
    }else{
      return res.status(404).json({
        status:"fail",
        message:"No Patient Found"
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getPrescriptionByDoctor = async (req,res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if(doctor){
      const prescriptions = await Prescription.Find({doctor:doctorId})
      if(prescriptions){
        const transformPrescriptions = prescriptions.map((prescription) => {
          return prescriptionTransformation(prescription)
        })
        return res.status(200).json({
          status:"success",
          data:transformPrescriptions
        })
      }
    }else{
      return res.status(404).json({
        status:"fail",
        message:"No Doctor Found"
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
