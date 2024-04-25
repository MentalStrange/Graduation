export const patientTransformation = (patient) => {
  return{
    name:patient.name,
    email:patient.email,
    nationalId:patient.nationalId,
    ...patient
  }
}
export const doctorTransformation = async (doctor) => {
  return{
    name:doctor.name,
    email:doctor.email,
    nationalId:doctor.nationalId,
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

export const appointmentTransformation = (appointment) => {
  return {
    doctorId:appointment.doctorId,
    userId:appointment.userId,
    type:appointment.type,
    timeSlot:appointment.timeSlot,
    status:appointment.status,
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