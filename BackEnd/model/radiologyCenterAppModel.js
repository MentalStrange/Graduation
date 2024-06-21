import mongoose from 'mongoose';

const radiologyCenterAppointmentSchema = mongoose.Schema({
  radiologyCenterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RadiologyCenter",
    required:[true,"Radiology Center Should Have an Id"]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
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
    type: String,
    required: [true, "Time slot is required"]
  },
  status:{
    type:String,
    enum:["pending", "selected", "confirmed","cancelled"],
    default:"pending"
  }
})

const RadiologyCenterAppointment = mongoose.model('RadiologyCenterAppointment', radiologyCenterAppointmentSchema);
export default RadiologyCenterAppointment