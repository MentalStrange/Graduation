import mongoose from 'mongoose';

const radiologistSchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,"Radiologist Should Have a Name"]
  },
  email:{
    type:String,
    require:[true,"Radiologist Should Have a Email"]
  },
  nationalId:{
    type:Number,
    unique:true,
    required:[true,"Receptionist Should Have a National Id"]
  },
  password:{
    type:String,
    require:[true,"Radiologist Should Have a Password"]
  },
  gender:{
    type:String,
    enum:["male", "female"],
  },
  phone:{
    type:String,
  },
  address:{
    type:String,
  },
  age:{
    type:String
  },
  specialization:{
    type:String
  },
  experience:{
    type:String
  },
  image:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
},{
  timeSlots:true
})

const Radiologist = mongoose.model("Radiologist",radiologistSchema)