import mongoose from "mongoose";

const radiologyCenterSchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,"Radiology Center Should Have a Name"]
  },
  email:{
    type:String,
    require:[true,"Radiology Center Should Have a Email"]
  },
  password:{
    type:String,
    require:[true,"Radiology Center Should Have a Password"]
  },
  phone:{
    type:String,
  },
  address:{
    type:String,
  }
}) 

const RadiologyCenter = mongoose.model("RadiologyCenter",radiologyCenterSchema)
export default RadiologyCenter