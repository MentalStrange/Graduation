import { appointmentTransformation } from "../format/transformation.js";
import Appointment from "../model/appointmentModel.js";
import Doctor from "../model/doctorModel.js"

export const getAppointmentsByDoctorId = async (req,res)=>{
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if(doctor){
      const appointments = await Appointment.Find({doctorId})
      if(appointments){
        return res.status(200).json({
          status:"success",
          data:appointments
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
export const getAppointmentsByPatientId = async (req,res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if(!patient){
      return res.status(404).json({
        status:"fail",
        message:"Patient Not Found"
      })
    }
    const appointments = await Appointment.find({userId:patientId});
    if(appointments.length > 0){
      const transformAppointments = appointments.map((appointment) => {
        return appointmentTransformation(appointment)
      })
      res.status(200).json({
        status:"success",
        data:transformAppointments
      })
    }
  }catch(error){
    
  }
}
export const createAppointmentForPatient = async (req,res) => {
  const appointmentData = req.body;
  try {
    const doctor = await Doctor.findById(appointmentData.doctorId);
    if(!doctor){
      return res.status(404).json({
        status:"fail",
        message:"Doctor Not Found"
      })
    }
    const patient = await Patient.findById(appointmentData.patientId);
    if(!patient){
      return res.status(404).json({
        status:"fail",
        message:"Patient Not Found"
      })
    }
    const newAppointment = await Appointment.create(appointmentData);
    res.status(200).json({
      status:"success",
      data:appointmentTransformation(newAppointment)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const updateAppointment = async (req,res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndUpdate(appointmentData._id,appointmentData);
    res.status(200).json({
      status:"success",
      data:appointmentTransformation(newAppointment)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deleteAppointment = async (req,res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndDelete(appointmentData._id);
    res.status(200).json({
      status:"success",
      data:appointmentTransformation(newAppointment)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}