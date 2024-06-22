import { radiologyCenterAppointmentTransformation } from "../format/transformation.js";
import RadiologyCenterAppointment from "../model/radiologyCenterAppModel.js";
import RadiologyCenter from "../model/radiologyCenterModel.js"; // Assuming you have this model
import Patient from "../model/patientModel.js"; // Assuming you have this model

// Helper function to generate time slots
const generateTimeSlots = (startTime, endTime, interval) => {
  const slots = [];
  let currentTime = startTime;
  while (currentTime < endTime) {
    const endTimeSlot = new Date(currentTime.getTime() + interval * 60000);
    slots.push(`${currentTime.toTimeString().slice(0, 5)} - ${endTimeSlot.toTimeString().slice(0, 5)}`);
    currentTime = endTimeSlot;
  }
  return slots;
};

// Function to generate and store time slots for a given date
const generateAndStoreTimeSlots = async (radiologyCenterId, date) => {
  const startTime = new Date(date.setHours(9, 0, 0)); // 09:00 AM
  const endTime = new Date(date.setHours(17, 0, 0)); // 05:00 PM
  const interval = 30; // 30 minutes
  const allTimeSlots = generateTimeSlots(startTime, endTime, interval);

  const timeSlotPromises = allTimeSlots.map(async (slot) => {
    const [start, end] = slot.split(' - ');
    const appointmentData = {
      radiologyCenterId,
      timeSlot: slot,
      startTime: new Date(`${date.toDateString()} ${start}`),
      endTime: new Date(`${date.toDateString()} ${end}`),
      status: "pending"
    };
    await RadiologyCenterAppointment.create(appointmentData);
  });

  await Promise.all(timeSlotPromises);
};

export const getAvailableTimeSlots = async (req, res) => {
  const radiologyCenterId = req.params.id;
  try {
    const appointments = await RadiologyCenterAppointment.find({
      radiologyCenterId,
      status: "pending",
    });
    return res.status(200).json({
      status: "success",
      data: appointments
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
// Update the createAppointmentForPatientRadiologyCenter function to include timeSlot
export const createAppointmentForPatientRadiologyCenter = async (req, res) => {
  const appointmentData = req.body;
  try {
    const radiologyCenter = await RadiologyCenter.findById(appointmentData.radiologyCenterId);
    if (!radiologyCenter) {
      return res.status(404).json({
        status: "fail",
        message: "Radiology Center Not Found"
      });
    }
    const patient = await Patient.findById(appointmentData.userId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient Not Found"
      });
    }
    const newAppointment = await RadiologyCenterAppointment.create(appointmentData);
    res.status(200).json({
      status: "success",
      data: radiologyCenterAppointmentTransformation(newAppointment)
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status, userId } = req.body;
  try {
    let appointment
    if(userId){
      appointment = await RadiologyCenterAppointment.findByIdAndUpdate(
        appointmentId,
        { status, userId,type:"patient" },
        { new: true }
      );
    }else{
      appointment = await RadiologyCenterAppointment.findByIdAndUpdate(
        appointmentId,
        { status, userId },
        { new: true }
      );
    }
    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment Not Found"
      });
    }
    res.status(200).json({
      status: "success",
      data: radiologyCenterAppointmentTransformation(appointment)
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
export const getRadiologyCenterAppointment = async (req, res) => {
  const radiologyCenterId = req.params.id;
  try {
    const appointments = await RadiologyCenterAppointment.find({ radiologyCenterId,status:{$ne:"pending"} });
    const transformAppointments = await Promise.all(appointments.map(async (appointment) => {
      return radiologyCenterAppointmentTransformation(appointment)
    }))
    if (appointments) {
      return res.status(200).json({
        status: "success",
        data: transformAppointments
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
export const getRadiologyCenterAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment) {
      return res.status(200).json({
        status: "success",
        data: radiologyCenterAppointmentTransformation(appointment)
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}

export const updateRadiologyCenterAppointment = async (req, res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await RadiologyCenterAppointment.findByIdAndUpdate(appointmentData._id, appointmentData);
    res.status(200).json({
      status: "success",
      data: radiologyCenterAppointmentTransformation(newAppointment)
    })
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}

export const deleteRadiologyCenterAppointment = async (req, res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await RadiologyCenterAppointment.findByIdAndDelete(appointmentData._id);
    res.status(200).json({
      status: "success",
      data: radiologyCenterAppointmentTransformation(newAppointment)
    })
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}

export const getRadiologyCenterAppointmentsForPatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const radiologyCenterAppointments = await RadiologyCenterAppointment.find({ userId: patientId });
    const transformAppointments = await Promise.all(
      radiologyCenterAppointments.map(async (appointment) => {
        return radiologyCenterAppointmentTransformation(appointment)
      })
    );
    if (transformAppointments) {
      return res.status(200).json({
        status: "success",
        data: transformAppointments
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
}
const setupDailyTimeSlots = async () => {
  const radiologyCenters = await RadiologyCenter.find();
  const today = new Date();
  for (const center of radiologyCenters) {
    await generateAndStoreTimeSlots(center._id, today);
  }
};

// Call setupDailyTimeSlots function to generate time slots for today
setupDailyTimeSlots();