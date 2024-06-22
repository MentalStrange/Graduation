import mongoose from 'mongoose'

const guestSchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,"You Should have a Name"]
  },
  email:{
    type:String,
    require:[true,"You Should Send the Email"]
  },
  age:{
    type:String,
    enum:["male","female"],
  },
  phone:{
    type:String,
    require:[true,"You Should have a Phone Number"]
  }
})

const Guest = mongoose.model("Guest",guestSchema)
export default Guest;