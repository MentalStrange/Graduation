import { radiologyCenterAppointmentTransformation } from "../format/transformation.js";

export const createAppointmentForPatientRadiologyCenter = async (req,res) => {
  const appointmentData = req.body;
  try {
    const radiologyCenter = await RadiologyCenter.findById(appointmentData.radiologyCenterId);
    if(!radiologyCenter){
      return res.status(404).json({
        status:"fail",
        message:"Radiology Center Not Found"
      })
    }
    const patient = await Patient.findById(appointmentData.userId);
    if(!patient){
      return res.status(404).json({
        status:"fail",
        message:"Patient Not Found"
      })
    }
    const newAppointment = await Appointment.create(appointmentData);
    res.status(200).json({
      status:"success",
      data:radiologyCenterAppointmentTransformation(newAppointment)
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getRadiologyCenterAppointment = async (req,res) => {
  const radiologyCenterId = req.params.id;
  try {
    const appointments = await Appointment.find({radiologyCenterId});
    const transformAppointments = appointments.map((appointment) => {
      return radiologyCenterAppointmentTransformation(appointment)
    })
    if(appointments){
      return res.status(200).json({
        status:"success",
        data:transformAppointments
      })
    }
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getRadiologyCenterAppointmentById = async (req,res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if(appointment){
      return res.status(200).json({
        status:"success",
        data:radiologyCenterAppointmentTransformation(appointment)
      })
    }
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const updateRadiologyCenterAppointment = async (req,res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndUpdate(appointmentData._id,appointmentData);
    res.status(200).json({
      status:"success",
      data:radiologyCenterAppointmentTransformation(newAppointment)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deleteRadiologyCenterAppointment = async (req,res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndDelete(appointmentData._id);
    res.status(200).json({
      status:"success",
      data:radiologyCenterAppointmentTransformation(newAppointment)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}