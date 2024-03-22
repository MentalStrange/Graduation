export const patientTransformation = (patient) => {
  return{
    name:patient.name,
    email:patient.email,
    nationalId:patient.nationalId,
    ...patient
  }
}
export const doctorTransformation = (doctor) => {
  return{
    name:doctor.name,
    email:doctor.email,
    nationalId:doctor.nationalId,
    ...doctor
  }
}