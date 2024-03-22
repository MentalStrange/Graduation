import mongoose from 'mongoose'

const scanSchema = mongoose.Schema({
  radiologyCenterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RadiologyCenter",
    required:[true,"Radiology Center Should Have an Id"]
  },
  radiologistId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Radiologist",
    required:[true,"Radiologist Should Have an Id"]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"User Should Have an Id"]
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
  reportId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Report"
  },

})

const Scan = mongoose.model('Scan',scanSchema )
export default Scan