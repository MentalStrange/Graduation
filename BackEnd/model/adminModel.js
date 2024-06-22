import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
  name:{
    type:String,
    required:[true,"Admin should have a name"]
  },
  email:{
    type:String,
    required:[true,"Admin should have a email"]
  },
  password:{
    type:String,
    min:8,
    required:[true,"Admin should have a password"]
  },
  age:{
    type:String,
  },
},{
  timestamps:true
})

const Admin = mongoose.model('Admin',adminSchema)

export default Admin;