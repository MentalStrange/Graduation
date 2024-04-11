import { radiologistTransformation, radiologyCenterTransformation } from "../format/transformation.js"
import Doctor from "../model/doctorModel.js"
import Patient from "../model/patientModel.js"
import Radiologist from "../model/radiologistModel.js"
import RadiologyCenter from "../model/radiologyCenterModel.js"

export const patientLogin = async (req, res) => {
  const patientData = req.body
  try {
    const patient = await Patient.findOne({ email: patientData.email })
    if(!patient){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(patientData.password,patient.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    res.status(200).json({
      status:"success",
      data:patientTransformation(patient)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}

export const doctorLogin = async (req, res) => {
  const doctorData = req.body
  try {
    const doctor = await Doctor.findOne({ email: doctorData.email })
    if(!doctor){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(doctorData.password,doctor.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    res.status(200).json({
      status:"success",
      data:doctorTransformation(doctor)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}


export const radiologistLogin = async (req, res) => {
  const radiologistData = req.body
  try {
    const radiologist = await Radiologist.findOne({ email: radiologistData.email })
    if(!radiologist){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(radiologistData.password,radiologist.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    res.status(200).json({
      status:"success",
      data:radiologistTransformation(radiologist)
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}

export const radiologyCenterLogin = async (req, res) => {
  const radiologyCenterData = req.body
  try {
    const radiologyCenter = await RadiologyCenter.findOne({ email: radiologyCenterData.email })
    if(!radiologyCenter){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(radiologyCenterData.password,radiologyCenter.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    res.status(200).json({
      status:"success",
      data:radiologyCenterTransformation(radiologyCenter)
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}