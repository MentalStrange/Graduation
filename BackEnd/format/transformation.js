import Doctor from "../model/doctorModel.js"
import Patient from "../model/patientModel.js"
import Prescription from "../model/prescriptionModel.js"
import RadiologyCenter from "../model/radiologyCenterModel.js"
import Appointment from "../model/appointmentModel.js"
import Report from "../model/reportModel.js"
import Scan from "../model/scanModel.js"
import Radiologist from "../model/radiologistModel.js"

export const patientTransformation = (patient) => {
  return{
    id: patient._id,
    name:patient.name,
    email:patient.email,
    nationalId:patient.nationalId,
    password:patient.password,
    image:patient.image,
    phone:patient.phone,
    address:patient.address,
    age:patient.age,
    gender:patient.gender,
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
    specialization:doctor.specialization,
    phone:doctor.phone,
    gender:doctor.gender,
    timeSlots:doctor.timeSlots,
    address:doctor.address
  }
}
export const receptionistTransformation = (receptionist) => {
  return{
    name:receptionist.name,
    email:receptionist.email,
    ...receptionist
  }
}
export const radiologistTransformation = async (radiologist) => {
  const numberOfFinishedScans = await Scan.countDocuments({ radiologistId: radiologist._id });
  return{
    id: radiologist._id,
    name:radiologist.name,
    email:radiologist.email,
    nationalId:radiologist.nationalId,
    gender: radiologist.gender,
    phone: radiologist.phone,
    address: radiologist.address,
    age: radiologist.age,
    specialization: radiologist.specialization,
    experience: radiologist.experience,
    image: radiologist.image,
    createdAt: radiologist.createdAt,
    numberOfFinishedScans: numberOfFinishedScans,
    startHour: radiologist.startHour,
    endHour: radiologist.endHour
  }
}
export const radiologyCenterTransformation = (radiologyCenter) => {
  return{
    id: radiologyCenter._id,
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
    id:appointment._id,
    doctor:doctor.name,
    userId:appointment.userId ?? null,
    user:patient.name ?? "Guest",
    type:appointment.type,
    timeSlot:appointment.timeSlot,
    status:appointment.status,
    date:appointment.createdAt,
    phone:doctor.phone,
    specialization:doctor.specialization,
    gender:doctor.gender,
    address:doctor.address,
    phone:doctor.phone,
    // ...appointment
  }
}
export const prescriptionTransformation = async (prescription) => {
  const doctor = await Doctor.findById(prescription.doctor);
  const patient = await Patient.findById(prescription.patient);
  return {
    doctor:doctor.name,
    patient:patient.name,
    description:prescription.description,
    timeSlot:prescription.timeSlot,
    drugs:prescription.drugs?? [],
    scans:prescription.scans?? [],
    examination:prescription.examination,
    date:prescription.date,
  }
} 
export const reportTransformation = async (report) => {
  const radiologist = await Radiologist.findById(report.radiologist)
  const patient = await Patient.findById(report.patient)
  return {
    id:report._id,
    radiologist:radiologist.name??"N/E",
    patient:patient.name??"N/E",
    type:report.type,
    timeSlot:report.timeSlot,
    status:report.status,
    description:report.description,
    date:report.createdAt,
    examination:report.examination,
    note:report.note
  }
}
export const scanTransformation = async (scan) => {
  let patient;
  const radiologist = await Radiologist.findById(scan.radiologistId)
  if(scan.userId){
    patient = await Patient.findById(scan.userId)
  }
  return {
    id:scan._id,
    radiologistId:scan.radiologistId,
    radiologist:radiologist.name,
    patientId:scan.userId,
    patient:patient.name ?? "Guest",
    type:scan.type,
    date:scan.createdAt,
    status:scan.status,
    image:scan.image,
  }
}
export const radiologyCenterAppointmentTransformation = async (radiologyCenterAppointment) => {
  let patient ;
  const radiologyCenter = await RadiologyCenter.findById(radiologyCenterAppointment.radiologyCenterId)
  if(radiologyCenterAppointment.userId){
    patient = await Patient.findById(radiologyCenterAppointment.userId)
  }
  return {
    id:radiologyCenterAppointment._id,
    date:radiologyCenterAppointment.createdAt,
    centerName:radiologyCenter.name,
    patient:patient.name ?? "Guest",
    status:radiologyCenterAppointment.status,
    timeSlot:radiologyCenterAppointment.timeSlot,
    phone:radiologyCenter.phone,
    // ...radiologyCenterAppointment
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
export const patientDetails = async (patientId) => {
  const prescriptions = await Prescription.find({patient:patientId})
  const transformPrescription = await Promise.all(prescriptions.map(async (prescription) => await prescriptionTransformation(prescription)))
  const appointments = await Appointment.find({userId:patientId})
  const transformAppointment = await Promise.all(appointments.map(async (appointment) => await appointmentTransformation(appointment)))
  const reports = await Report.find({patient:patientId})
  const transformReport = await Promise.all(reports.map(async (report) => await reportTransformation(report)))
  const scans = await Scan.find({userId:patientId})
  const transformScan = await Promise.all(scans.map(async (scan) => await scanTransformation(scan)))
  const patient = await Patient.findById(patientId)
  const transformPatient = await patientTransformation(patient)
  return(
    {
      patient:transformPatient,
      prescriptions:transformPrescription,
      appointments:transformAppointment,
      reports:transformReport,
      scans:transformScan
    }
  )
}