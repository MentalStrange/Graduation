import { radiologistTransformation, radiologyCenterTransformation } from "../format/transformation.js"
import { generateToken } from "../helper/generateToken.js"
import Doctor from "../model/doctorModel.js"
import Patient from "../model/patientModel.js"
import Radiologist from "../model/radiologistModel.js"
import RadiologyCenter from "../model/radiologyCenterModel.js"
import Receptionist from "../model/receptionistModel.js"

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
    const token = generateToken({id:patient._id,role:patient.role})
    res.status(200).json({
      status:"success",
      data:patientTransformation(patient),
      token
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
    const token = generateToken({id:doctor._id,role:doctor.role})
    res.status(200).json({
      status:"success",
      data:doctorTransformation(doctor),
      token
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
    const token = generateToken({id:radiologist._id,role:radiologist.role})
    res.status(200).json({
      status:"success",
      data:radiologistTransformation(radiologist),
      token
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
    const token = generateToken({id:radiologyCenter._id,role:radiologyCenter.role})
    res.status(200).json({
      status:"success",
      data:radiologyCenterTransformation(radiologyCenter),
      token
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const receptionistLogin = async (req, res) => {
  const receptionistData = req.body
  try {
    const receptionist = await Receptionist.findOne({ email: receptionistData.email })
    if(!receptionist){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(receptionistData.password,receptionist.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    const token = generateToken({id:receptionist._id,role:receptionist.role})
    res.status(200).json({
      status:"success",
      data:receptionistTransformation(receptionist),
      token
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const adminLogin = async (req, res) => {
  const adminData = req.body
  try {
    const admin = await Admin.findOne({ email: adminData.email })
    if(!admin){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(adminData.password,admin.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    const token = generateToken({id:admin._id,role:admin.role})
    res.status(200).json({
      status:"success",
      data:adminTransformation(admin),
      token
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
