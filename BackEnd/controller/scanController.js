import Scan from "../model/scanModel.js";

export const getScanByPatientId = async (req,res) => {
  const patientId = req.params.id;
  try {
    const scans = await Scan.find({userId:patientId});
    if(scans){
      return res.status(200).json({
        status:"success",
        data:scans
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}