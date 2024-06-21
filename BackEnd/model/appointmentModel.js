import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:[true,"Doctor Should Have an Id"]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    // required:[true,"Patient Should Have an Id"]
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  type:{
    type:String,
    enum:["guest","patient"],
    default:"guest" 
  },
  timeSlot:{
    type:String
  },
  status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending"
  },
  note:{
    type:String
  },

},{
  timeSlots:true
})

const Appointment = mongoose.model('Appointment',appointmentSchema)
export default Appointment