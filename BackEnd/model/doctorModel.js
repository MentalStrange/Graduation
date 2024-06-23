import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,"Doctor Should Have a Name"]
  },
  email:{
    type:String,
    required:[true,"Doctor Should Have an Email"],
    unique:true,
    lowercase:true
  },
  nationalId:{
    type:Number,
    unique:true,
    required:[true,"Receptionist Should Have a National Id"]
  },
  password:{
    type:String,
    required:[true,"Doctor Should Have a Password"],
    minlength:8
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
  specialization:{
    type:String,
    // required:[true,"Doctor Should Have a Specialization"]
  },
  experience:[{
    type:String,
  }],
  bio:{
    type:String
  },
  about:{
    type:String,
  },
  qualification:[{
    type:String,
  }],
  startHour:{
    type:String
  },
  endHour:{
  type:String
  },
  image:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  status:{
    type:String,
    enum:['pending','approved','cancelled'],
  },
  totalRating:{
    type:Number,
    default:0
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  createdAt:{
    type:Date,
    default:Date.now()
  }
},{
  timeSlots:true
})

// this function will help you in watching changes and to use it in real time...
// doctorSchema.watch().on('change', (data) => {
//   if(data.operationType === 'insert'){
//     console.log(data.fullDocument)
//   }
// })
const Doctor = mongoose.model('Doctor',doctorSchema)
export default Doctor;
