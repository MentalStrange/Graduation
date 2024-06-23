import { patientTransformation, radiologistTransformation } from "../format/transformation.js";
import Patient from "../model/patientModel.js";
import Radiologist from "../model/radiologistModel.js";
import Scan from "../model/scanModel.js";

export const updateRadiologist = async (req, res) => {
  const radiologistData = req.body;  // Renamed from 'radiologist' to 'radiologistData'
  const radiologistId = req.params.id;
  try {
    const updatedRadiologist = await Radiologist.findByIdAndUpdate(radiologistId, radiologistData);
    res.status(200).json({
      status: "success",
      data: await radiologistTransformation(updatedRadiologist)
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
}
export const getAllRadiologist = async (req, res) => {
  try {
    const radiologists = await Radiologist.find();
    if (radiologists) {
      const transformRadiologist = await Promise.all(radiologists.map(async (radiologist) => {
        return radiologistTransformation(radiologist)
      }))
      return res.status(200).json({
        status: "success",
        data: transformRadiologist
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
export const getRadiologistById = async (req, res) => {
  try {
    const radiologistId = req.params.id;
    const radiologist = await Radiologist.findById(radiologistId);

    if (radiologist) {
      return res.status(200).json({
        status: "success",
        data: await radiologistTransformation(radiologist)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
export const getPatientsByRadiologistId = async (req, res) => {
  try {
    const radiologistId = req.params.id;
    const scans = await Scan.find({ radiologistId});
    if (scans) {
      const patients = await Promise.all(scans.map(async (scan) => {
        const patient = await Patient.findById(scan.userId);
        return patient;
      }))
      const transformPatients = patients.map(patient => patientTransformation(patient));
      return res.status(200).json({
        status: "success",
        data: transformPatients
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
