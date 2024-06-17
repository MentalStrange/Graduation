import { patientTransformation } from "../format/transformation.js";
import Patient from "../model/patientModel.js";

export const updatePatient = async (req,res) => {
  const patient = req.body
  try {
    const newPatient = await Patient.findByIdAndUpdate(patient._id,patient);
    res.status(200).json({
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
    console.log('patient', patient);
    
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