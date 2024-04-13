export const updateRadiologyCenter = async (req,res) => {
  const radiologyCenter = req.body
  try {
    const newRadiologyCenter = await RadiologyCenter.findByIdAndUpdate(radiologyCenter._id,radiologyCenter);
    res.status(200).json({
      status:"success",
      data:radiologyCenterTransformation(newRadiologyCenter)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const deleteRadiologyCenter = async (req,res) => {
  const radiologyCenter = req.body
  try {
    const newRadiologyCenter = await RadiologyCenter.findByIdAndDelete(radiologyCenter._id);
    res.status(200).json({
      status:"success",
      data:radiologyCenterTransformation(newRadiologyCenter)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
} 
export const getAllRadiologyCenter = async (req,res) => {
  try {
    const radiologyCenters = await RadiologyCenter.find();
    if(radiologyCenters){
      const transformRadiologyCenter = radiologyCenters.map((radiologyCenter) => {
        return radiologyCenterTransformation(radiologyCenter)
      })
      return res.status(200).json({
        status:"success",
        data:transformRadiologyCenter
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}
export const getRadiologyCenterById = async (req,res) => {
  const radiologyCenterId = req.params.id;
  try {
    const radiologyCenter = await RadiologyCenter.findById(radiologyCenterId);
    if(radiologyCenter){
      return res.status(200).json({
        status:"success",
        data:radiologyCenterTransformation(radiologyCenter)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}