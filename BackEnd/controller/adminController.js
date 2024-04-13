export const updateAdmin = async (req,res) => {
  const admin = req.body
  try {
    const newAdmin = await Admin.findByIdAndUpdate(admin._id,admin);
    res.status(200).json({
      status:"success",
      data:adminTransformation(newAdmin)  
    })
  }catch(error){
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}