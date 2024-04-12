import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  date:{
    type:Date,
    default:Date.now()
  },
  patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient"
  },
  doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor"
  },
  description:{
    type:String,
  },
  examination:{
    type:String,
  }
})

const Prescription = mongoose.model("Prescription",prescriptionSchema)
export default Prescription