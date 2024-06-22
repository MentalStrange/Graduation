import mongoose from 'mongoose';

const receptionistPatientSchema = mongoose.Schema({
  receptionistId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Receptionist",
    required:[true,"Receptionist Should Have an Id"]
  },
  patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:[true,"Patient Should Have an Id"]
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

const ReceptionistPatient = mongoose.model('ReceptionistPatient',receptionistPatientSchema)
export default ReceptionistPatient