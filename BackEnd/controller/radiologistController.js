import { radiologistTransformation } from "../format/transformation.js";
import Radiologist from "../model/radiologistModel.js";

export const updateRadiologist = async (req, res) => {
  const radiologistData = req.body;  // Renamed from 'radiologist' to 'radiologistData'
  try {
    const updatedRadiologist = await Radiologist.findByIdAndUpdate(radiologistData._id, radiologistData);
    res.status(200).json({
      status: "success",
      data: radiologistTransformation(updatedRadiologist)
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
        data: radiologistTransformation(radiologist)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
