import Receptionist from "../model/receptionistModel.js";

export const getReceptionistById = async (req, res) => {
  const receptionistId = req.params.id;
  try {
    const receptionist = await Receptionist.findById(receptionistId);
    if (!receptionist) {
      return res.status(404).json({ message: "Receptionist not found" });
    }
    res.status(200).json({
      status: "success",
      data: receptionist,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
