import Patient from "../model/patientModel.js"

export const patientLogin = async (req, res) => {
  const patientData = req.body
  try {
    const patient = await Patient.findOne({ email: patientData.email })
    if(!patient){
      return res.status(400).json({
        status:"fail",
        message:"Email Not Found"
      })
    }
    const isMatch = await bcrypt.compare(patientData.password,patient.password)
    if(!isMatch){
      return res.status(400).json({
        status:"fail",
        message:"Incorrect Password"
      })
    }
    res.status(200).json({
      status:"success",
      data:patientTransformation(patient)
    })
  } catch (error) {
    return res.status(500).json({
      status:"fail",
      message:error.message
    })
  }
}