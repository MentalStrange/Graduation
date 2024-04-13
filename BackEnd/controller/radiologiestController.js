export const updateRadiologist = async (req,res) => {
  const radiologist = req.body
  try {
    const newRadiologist = await Radiologist.findByIdAndUpdate(radiologist._id,radiologist);
    res.status(200).json({
      status:"success",
      data:radiologistTransformation(newRadiologist)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getAllRadiologist = async (req,res) => {
  try {
    const radiologists = await Radiologist.find();
    if(radiologists){
      const transformRadiologist = radiologists.map((radiologist) => {
        return radiologistTransformation(radiologist)
      })
      return res.status(200).json({
        status:"success",
        data:transformRadiologist
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getRadiologistById = async (req,res) => {
  const radiologistId = req.params.id;
  try {
    const radiologist = await Radiologist.findById(radiologistId);
    if(radiologist){
      return res.status(200).json({
        status:"success",
        data:radiologistTransformation(radiologist)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
