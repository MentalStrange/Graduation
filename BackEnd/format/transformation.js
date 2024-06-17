import Doctor from "../model/doctorModel.js"
import Patient from "../model/patientModel.js"

export const patientTransformation = (patient) => {
  return{
    id: patient._id,
    name:patient.name,
    email:patient.email,
    nationalId:patient.nationalId,
    password:patient.password,
    image:patient.image,
  }
}
export const doctorTransformation = async (doctor) => {
  return{
    id: doctor._id,
    name:doctor.name,
    email:doctor.email,
    nationalId:doctor.nationalId,
    image:doctor.image,
    rating:doctor.rating,
    ...doctor
  }
}
export const receptionistTransformation = (receptionist) => {
  return{
    name:receptionist.name,
    email:receptionist.email,
    ...receptionist
  }
}
export const radiologistTransformation = (radiologist) => {
  return{
    name:radiologist.name,
    email:radiologist.email,
    nationalId:radiologist.nationalId,
    ...radiologist
  }
}

export const radiologyCenterTransformation = (radiologyCenter) => {
  return{
    name:radiologyCenter.name,
    email:radiologyCenter.email,
    nationalId:radiologyCenter.nationalId,
    ...radiologyCenter
  }
}

export const appointmentTransformation = async (appointment) => {
  const doctor = await Doctor.findById(appointment.doctorId);
  let patient = null;
  if(appointment.type == 'patient'){
    patient = await Patient.findById(appointment.userId);
  }
  return {
    doctor:doctor.name,
    user:patient.name || "Guest",
    type:appointment.type,
    timeSlot:appointment.timeSlot,
    status:appointment.status,
    date:appointment.createdAt,
    ...appointment
  }
}
export const prescriptionTransformation = (prescription) => {
  return {
    doctorId:prescription.doctorId,
    userId:prescription.userId,
    type:prescription.type,
    timeSlot:prescription.timeSlot,
    status:prescription.status,
    ...prescription
  }
} 
export const reportTransformation = (report) => {
  return {
    doctorId:report.doctorId,
    userId:report.userId,
    type:report.type,
    timeSlot:report.timeSlot,
    status:report.status,
    ...report
  }
}
export const scanTransformation = (scan) => {
  return {
    doctorId:scan.doctorId,
    userId:scan.userId,
    type:scan.type,
    timeSlot:scan.timeSlot,
    status:scan.status,
    ...scan
  }
}
export const radiologyCenterAppointmentTransformation = (radiologyCenterAppointment) => {
  return {
    radiologyCenterId:radiologyCenterAppointment.radiologyCenterId,
    userId:radiologyCenterAppointment.userId,
    type:radiologyCenterAppointment.type,
    ...radiologyCenterAppointment
  }
}

export const userTransformation = (user) => {
  return {
    name:user.name,
    email:user.email,
    role:user.role,
    ...user
  }
}