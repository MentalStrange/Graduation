import { scanTransformation } from "../format/transformation.js";
import Report from "../model/reportModel.js";
import Scan from "../model/scanModel.js";

export const getScanByPatientId = async (req,res) => {
  const patientId = req.params.id;
  try {
    const scans = await Scan.find({userId:patientId});
    const scansTransformation = await Promise.all(scans.map(async scan => scanTransformation(scan)));
    if(scans){
      return res.status(200).json({
        status:"success",
        data:scansTransformation
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const createScan = async (req, res) => {
  try {
    const { radiologyCenterId, radiologistId, userId, type, image, reportId } = req.body;
    if (!radiologyCenterId) {
      return res.status(400).json({
        status: "fail",
        message: "Radiology Center ID is required."
      });
    }
    if (!radiologistId) {
      return res.status(400).json({
        status: "fail",
        message: "Radiologist ID is required."
      });
    }
    if (!type || !["guest", "patient"].includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Type must be either 'guest' or 'patient'."
      });
    }
    const scan = await Scan.create({ radiologyCenterId, radiologistId, userId, type, image, reportId });
    return res.status(200).json({
      status: "success",
      data: scan
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
export const getScansByRadiologyCenterId = async (req, res) => {
  const radiologyCenterId = req.params.id;
  try {
    const scans = await Scan.find({ radiologyCenterId: radiologyCenterId });
    const scansTransformation = await Promise.all(scans.map(async scan => scanTransformation(scan)));
    if (!scans || scans.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No scans found for this radiology center."
      });
    }
    return res.status(200).json({
      status: "success",
      data: scansTransformation
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
export const getScansByRadiologistId = async (req, res) => {
  const radiologistId = req.params.id;
  try {
    const scans = await Scan.find({ radiologistId: radiologistId });
    const scansTransformation = await Promise.all(scans.map(async scan => scanTransformation(scan)));
    if (!scans || scans.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No scans found for this radiologist."
      });
    }
    return res.status(200).json({
      status: "success",
      data: scansTransformation
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
export const updateScan = async (req, res) => {
  const scanId = req.params.id;
  const updateData = req.body;
  try {
    if(updateData.reportId){
      const report = await Report.findById(updateData.reportId);
      if(!report){
        return res.status(404).json({
          status:"fail",
          message:"No report found with that ID."
        })
      }
    }
    const updatedScan = await Scan.findByIdAndUpdate(scanId, {...updateData,reportId:updateData.reportId,status:"reported"}, { new: true });
    if (!updatedScan) {
      return res.status(404).json({
        status: "fail",
        message: "No scan found with that ID."
      });
    }
    return res.status(200).json({
      status: "success",
      data: updatedScan
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
