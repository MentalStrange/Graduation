import mongoose from "mongoose"

const reportSchema = mongoose.Schema({
  patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient"
  },
  doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor"
  },
  radiologist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Radiologist"
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  description:{
    type:String,
  },
  examination:{
    type:String,
  },
  note:{
    type:String
  }
},{
  timeSlots:true
})

const Report = mongoose.model("Report",reportSchema)
export default Report