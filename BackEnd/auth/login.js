import {
  userTransformation
} from "../format/transformation.js";
import { generateToken } from "../helper/generateToken.js";
import Doctor from "../model/doctorModel.js";
import Patient from "../model/patientModel.js";
import Radiologist from "../model/radiologistModel.js";
import RadiologyCenter from "../model/radiologyCenterModel.js";
import Receptionist from "../model/receptionistModel.js";
import bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
  const user =
    (await Doctor.findOne({ email })) ||
    (await Patient.findOne({ email })) ||
    (await Radiologist.findOne({ email })) ||
    (await RadiologyCenter.findOne({ email })) ||
    (await Receptionist.findOne({ email }));

  return user;
};
console.log(getUserByEmail);
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('user.password', user.password);
    
    console.log('isPassword Match', await bcrypt.compare(password,user.password));

    
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password Not Correct" });
    }
    const token = generateToken({ id: user._id, role: user.role });
    const { password: userPassword, ...userData } = user.toObject();
    res.status(200).json({
      status:"success",
      data: userTransformation(userData),
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
