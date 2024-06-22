import mongoose from "mongoose"

const reportSchema = mongoose.Schema({
  patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:[true,"Patient is required"]
  },
  radiologist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"radiologist",
    required:[true,"Radiologist is required"]
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