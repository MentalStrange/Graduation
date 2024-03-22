import mongoose  from "mongoose";

const patientSchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,"Patient Should Have an Email"]
  },
  email:{
    type:String,
    unique:true
  },
  nationalId:{
    type:Number,
    unique:true,
    required:[true,"Receptionist Should Have a National Id"]
  },
  password:{
    type:String,
    require:[true,"Patient Should have a password"]
  },
  about:{
    type:String,
  },
  address:{
    type:String,
    // required:[true,"Doctor Should Have an Address"]
  },
  phone:{
    type:String,
    // required:[true,"Doctor Should Have a Phone Number"]
  },
  gender:{
    type:String,
    enum:["male", "female"],
    // required:[true,"Doctor Should Have a Gender"]
  },
  age:{
    type:Number,
    // required:[true,"Doctor Should Have an Age"]
  },
  status:{
    type:String,
    enum:["active,inActive"]
  },
})

const Patient = mongoose.model("Patient",patientSchema)
export default Patient