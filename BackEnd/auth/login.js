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
  let user = await Doctor.findOne({ email });
  if (user) return { ...user.toObject(), role: 'doctor' };

  user = await Patient.findOne({ email });
  if (user) return { ...user.toObject(), role: 'patient' };

  user = await Radiologist.findOne({ email });
  if (user) return { ...user.toObject(), role: 'radiologist' };

  user = await RadiologyCenter.findOne({ email });
  if (user) return { ...user.toObject(), role: 'radiologyCenter' };

  user = await Receptionist.findOne({ email });
  if (user) return { ...user.toObject(), role: 'receptionist' };

  return null;
};

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
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password Not Correct" });
    }
    const token = generateToken({ id: user._id, role: user.role });
    const { password: userPassword, ...userData } = user;
    res.status(200).json({
      status: "success",
      data: userTransformation(userData),
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
