import mongoose from "mongoose";

const doctorRadiologistMessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "radiologist",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
},{
  timestamps:true
});

const DoctorRadiologistMessage = mongoose.model("DoctorRadiologistMessage", doctorRadiologistMessageSchema);
export default DoctorRadiologistMessage