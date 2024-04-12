import { patientTransformation } from "../format/transformation.js";
import Patient from "../model/patientModel.js";

export const updatePatient = async (req,res) => {
  const patient = req.body
  try {
    const newPatient = await Patient.findByIdAndUpdate(patient._id,patient);
    res.status(200).json({
      status:"success",
      data:patientTransformation(newPatient)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}