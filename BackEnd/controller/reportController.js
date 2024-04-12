import Report from "../model/reportModel.js";
import { reportTransformation } from "../format/transformation.js";
import Radiologist from "../model/radiologistModel.js";
import Doctor from "../model/doctorModel.js";
import Patient from "../model/patientModel.js";

export const getAllReports = async (req,res) => {
  try {
    const reports = await Report.find();
    const transformReports = reports.map((report) => {
      return reportTransformation(report)
    })
    if(reports){
      return res.status(200).json({
        status:"success",
        data:transformReports
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getReportById = async (req,res) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findById(reportId);
    if(report){
      return res.status(200).json({
        status:"success",
        data:reportTransformation(report)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const createReport = async (req,res) => {
  const report = req.body;
  try {
    const patient = await Patient.findById(report.patient);
    if(!patient){
      return res.status(404).json({
        status:"fail",
        message:"Patient Not Found"
      })
    }
    const doctor = await Doctor.findById(report.doctor);
    if(!doctor){
      return res.status(404).json({
        status:"fail",
        message:"Doctor Not Found"
      })
    }
    const radiologist = await Radiologist.findById(report.radiologist);
    if(!radiologist){
      return res.status(404).json({
        status:"fail",
        message:"Radiologist Not Found"
      })
    }
    const newReport = await Report.create(report);
    if(newReport){
      return res.status(200).json({
        status:"success",
        data:reportTransformation(newReport)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getReportByPatient = async (req,res) => {
  const patientId = req.params.id;
  try {
    const reports = await Report.find({patient:patientId});
    const transformReports = reports.map((report) => {
      return reportTransformation(report)
    })
    if(reports){
      return res.status(200).json({
        status:"success",
        data:transformReports
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getReportByDoctor = async (req,res) => {
  const doctorId = req.params.id;
  try {
    const reports = await Report.find({doctor:doctorId});
    const transformReports = reports.map((report) => {
      return reportTransformation(report)
    })
    if(reports){
      return res.status(200).json({
        status:"success",
        data:transformReports
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getReportByRadiologist = async (req,res) => {
  const radiologistId = req.params.id;
  try {
    const reports = await Report.find({radiologist:radiologistId});
    const transformReports = reports.map((report) => {
      return reportTransformation(report)
    })
    if(reports){
      return res.status(200).json({
        status:"success",
        data:transformReports
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const updateReport = async (req,res) => {
  const reportId = req.params.id;
  const report = req.body;
  try {
    const newReport = await Report.findByIdAndUpdate(reportId,report);
    if(newReport){
      return res.status(200).json({
        status:"success",
        data:reportTransformation(newReport)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deleteReport = async (req,res) => {
  const reportId = req.params.id;
  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if(deletedReport){
      return res.status(200).json({
        status:"success",
        data:reportTransformation(deletedReport)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
} 