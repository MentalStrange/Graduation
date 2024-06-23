import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  date:{
    type:Date,
    default:Date.now()
  },
  patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:[true,"Patient is required"]
  },
  doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:[true,"Doctor is required"]
  },
  description:{
    type:String,
    required:[true,"Description is required"]
  },
  examination:{
    type:String,
  },
  drugs:[
    {
      type:String,
    }
  ],
  scan:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Scan",
      required:[true,"Scan is required"]
    },
    report:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Report",
      required:[true,"Report is required"]
    }
},{
  timestamps:[true,]
})

const Prescription = mongoose.model("Prescription",prescriptionSchema)
export default Prescription