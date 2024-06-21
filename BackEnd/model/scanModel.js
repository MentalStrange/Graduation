import mongoose from 'mongoose'

const scanSchema = mongoose.Schema({
  radiologyCenterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RadiologyCenter",
    required:[true,"Radiology Center Should Have an Id"]
  },
  radiologistId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"radiologist",
    required:[true,"radiologist Should Have an Id"]
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
  image:
    {
      type:String,
      required:[true,"Image is required"]
    }
  ,
  status:{
    type:String,
    enum:["reported","notReported"],
    default:"notReported"
  }

})

const Scan = mongoose.model('Scan',scanSchema )
export default Scan