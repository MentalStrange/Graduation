import { doctorTransformation } from "../format/transformation.js";
import Doctor from "../model/doctorModel.js";

export const updateDoctor = async (req,res) => {
  const doctor = req.body
  try {
    const newDoctor = await Doctor.findByIdAndUpdate(doctor._id,doctor);
    res.status(200).json({
      status:"success",
      data:doctorTransformation(newDoctor)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deleteDoctor = async (req,res) => {
  const doctorId = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if(deletedDoctor){
      return res.status(200).json({
        status:"success",
        data:doctorTransformation(deletedDoctor)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getAllDoctor = async (req,res) => {
  try {
    const doctors = await Doctor.find();
    if(doctors){
      const transformDoctor = doctors.map((doctor) => {
        return doctorTransformation(doctor)
      })
      return res.status(200).json({
        status:"success",
        data:transformDoctor
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}