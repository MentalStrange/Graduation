import Doctor from "../model/doctorModel.js";
import Patient from "../model/patientModel.js";
import radiologist from '../model/radiologistModel.js';
import RadiologyCenter from '../model/radiologyCenterModel.js'
import Admin from '../model/adminModel.js'

export const restrict = (roles) => async (req,res,next)  => {
  const userId = req.id;
  try {
    let user;

    if(req.role == 'patient'){
      user = await Patient.findById(userId)
    }else if(req.role == 'doctor'){
      user = await Doctor.findById(userId)
    }else if(req.role == 'radiologist'){
      user = await radiologist.findById(userId);
    }else if(req.role == 'radiologyCenter'){
      user = await RadiologyCenter.findById(userId);
    }else if(req.role == 'admin'){
      user = await Admin.findById(userId);
    }

    if(!user){
      res.status(403).json({
        status:"fail",
        message:"User Not Found!"
      })
    }

    if(!roles.includes(user.role)){
      return res.status(401).json({
        status:"fail",
        message:"You are Not Authorized!"
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      status:"fail",
      message:error.message,
    })
  }
}