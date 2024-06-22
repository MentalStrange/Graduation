import mongoose from "mongoose";

const receptionistSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,"Receptionist Should Have a Name"]
  },
  email:{
    type:String,
    required:[true,"Receptionist Should Have an Email"],
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:[true,"Receptionist Should Have a Password"],
    minlength:8
  },
  address:{
    type:String,
    // required:[true,"Receptionist Should Have an Address"]
  },
  phone:{
    type:String,
    // required:[true,"Receptionist Should Have a Phone Number"]
  },
  gender:{
    type:String,
    enum:["male", "female"],
    // required:[true,"Receptionist Should Have a Gender"]
  },
  age:{
    type:String,
    // required:[true,"Receptionist Should Have an Age"]
  },
  nationalId:{
    type:Number,
    unique:true,
    required:[true,"Receptionist Should Have a National Id"]
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

const Receptionist = mongoose.model('Receptionist',receptionistSchema)
export default Receptionist