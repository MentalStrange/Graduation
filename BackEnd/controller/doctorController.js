import { doctorTransformation } from "../format/transformation.js";
import { checkApproved } from "../helper/checkApprovedDoctor.js";
import Doctor from "../model/doctorModel.js";

export const updateDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, {
      new: true,
    });
    if (updatedDoctor) {
      return res.status(200).json({
        status: "success",
        data: await doctorTransformation(updatedDoctor),
        checkApproved: await checkApproved(updatedDoctor),
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (deletedDoctor) {
      return res.status(200).json({
        status: "success",
        data: doctorTransformation(deletedDoctor),
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors) {
      const transformDoctor = doctors.map((doctor) => {
        return doctorTransformation(doctor);
      });
      return res.status(200).json({
        status: "success",
        data: transformDoctor,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      return res.status(200).json({
        status: "success",
        data: doctorTransformation(doctor),
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
