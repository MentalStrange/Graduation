import { doctorTransformation } from "../format/transformation.js";
import { checkApproved } from "../helper/checkApprovedDoctor.js";
import Doctor from "../model/doctorModel.js";
import Prescription from "../model/prescriptionModel.js";
import bcrypt from "bcrypt";

export const updateDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, {
      new: true,
    });
    await checkApproved(updatedDoctor);
    if (updatedDoctor) {
      return res.status(200).json({
        status: "success",
        data: await doctorTransformation(updatedDoctor),
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
      const transformDoctor = await Promise.all(doctors.map(async (doctor) => {
        return doctorTransformation(doctor)
      }))
      console.log(transformDoctor);
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
        data: await doctorTransformation(doctor),
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
import Prescription from "../model/prescriptionModel.js";

export const getTopDoctors = async (req, res) => {
  try {
    const topDoctors = await Prescription.aggregate([
      { $group: { _id: "$doctor", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_id",
          as: "doctor"
        }
      },
      { $unwind: "$doctor" },
      { $project: { _id: 0, doctor: 1, count: 1 } }
    ]);

    return res.status(200).json({
      status: "success",
      data: topDoctors,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
