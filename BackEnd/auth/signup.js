import bcrypt from "bcrypt"
import { doctorTransformation, patientTransformation, receptionistTransformation } from "../format/transformation.js";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Radiologist from "../model/radiologistModel.js";
import RadiologyCenter from "../model/radiologyCenterModel.js";
import Receptionist from "../model/receptionistModel.js";
const salt = 10;
export const patientSignUp = async (req, res) => {
  const patientData = req.body
  try {
    const oldPatient = await Patient.findOne({ email: patientData.email })
    if(oldPatient){
      return res.status(400).json({
        status:"fail",
        message:"Email Already Exists"
      })
    }
    const hashedPassword = await bcrypt.hash(patientData.password,salt)    
    // const newPatient = await Patient.create({
    //   name:patientData.name,
    //   email:patientData.email,
    //   nationalId:patientData.nationalId,
    //   password:hashedPassword,
    //   ...patientData
    // })
    console.log(patientData);
    const newPatient = new Patient({
      ...patientData,
      name:patientData.name,
      email:patientData.email,
      password:hashedPassword,
      nationalId:patientData.nationalId,
    })
    console.log('newPatient', newPatient);
    
    await newPatient.save();
    res.status(200).json({
      status:"success",
      data:patientTransformation(newPatient)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const doctorSignUp = async (req, res) => {
  const doctorData = req.body
  try {
    const oldDoctor = await Doctor.findOne({ email: doctorData.email })
    if(oldDoctor){
      return res.status(400).json({
        status:"fail",
        message:"Email Already Exists"
      })
    }
    const hashedPassword = await bcrypt.hash(doctorData.password,salt)
    const newDoctor = new Doctor({
      name:doctorData.name,
      email:doctorData.email,
      nationalId:doctorData.nationalId,
      ...doctorData,
      password:hashedPassword
    })
    let status = "approved";
    Object.entries(newDoctor.toObject()).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        status = "pending";
      } else if (typeof value === "string" && value.trim() === "") {
        status = "pending";
      } else if (typeof value === "number" && isNaN(value)) {
        status = "pending";
      }
    });
    // Update supplier status
    newDoctor.status = status;
    await newDoctor.save();
    res.status(200).json({
      status:"success",
      data: newDoctor
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const radiologistSignUp = async (req, res) => {
  const radiologistData = req.body
  try {
    const oldRadiologist = await Radiologist.findOne({ email: radiologistData.email })
    if(oldRadiologist){
      return res.status(400).json({
        status:"fail",
        message:"Email Already Exists"
      })
    }
    const hashedPassword = await bcrypt.hash(radiologistData.password,salt)
    const newRadiologist = await Radiologist.create({
      name:radiologistData.name,
      email:radiologistData.email,
      nationalId:radiologistData.nationalId,
      password:hashedPassword,
      ...radiologistData
    })
    res.status(200).json({
      status:"success",
      data:radiologistTransformation(newRadiologist)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const radiologyCenterSignUp = async (req, res) => {
  const radiologyCenterData = req.body
  try {
    const oldRadiologyCenter = await RadiologyCenter.findOne({ email: radiologyCenterData.email })
    if(oldRadiologyCenter){
      return res.status(400).json({
        status:"fail",
        message:"Email Already Exists"
      })
    }
    const hashedPassword = await bcrypt.hash(radiologyCenterData.password,salt)
    const newRadiologyCenter = await RadiologyCenter.create({
      name:radiologyCenterData.name,
      email:radiologyCenterData.email,
      password:hashedPassword,
      ...radiologyCenterData
    })
    res.status(200).json({
      status:"success",
      data:radiologyCenterTransformation(newRadiologyCenter)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const receptionistSignUp = async (req, res) => {
  const receptionistData = req.body
  try {
    const oldReceptionist = await Receptionist.findOne({ email: receptionistData.email })
    if(oldReceptionist){
      return res.status(400).json({
        status:"fail",
        message:"Email Already Exists"
      })
    }
    const hashedPassword = await bcrypt.hash(receptionistData.password,salt)
    const newReceptionist = await Receptionist.create({
      name:receptionistData.name,
      email:receptionistData.email,
      password:hashedPassword,
      ...receptionistData
    })
    res.status(200).json({
      status:"success",
      data:receptionistTransformation(newReceptionist)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
