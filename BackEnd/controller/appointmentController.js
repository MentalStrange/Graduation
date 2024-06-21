import { appointmentTransformation } from "../format/transformation.js";
import Appointment from "../model/appointmentModel.js";
import Doctor from "../model/doctorModel.js";
import Patient from "../model/patientModel.js";

// Helper function to generate time slots
const generateTimeSlots = (startTime, endTime, interval) => {
  const slots = [];
  let currentTime = startTime;
  while (currentTime < endTime) {
    const endTimeSlot = new Date(currentTime.getTime() + interval * 60000);
    slots.push(
      `${currentTime.toTimeString().slice(0, 5)} - ${endTimeSlot
        .toTimeString()
        .slice(0, 5)}`
    );
    currentTime = endTimeSlot;
  }
  return slots;
};
// Function to generate and store time slots for a given date and doctor
const generateAndStoreTimeSlots = async (doctorId, date) => {
  const startTime = new Date(date.setHours(9, 0, 0)); // 09:00 AM
  const endTime = new Date(date.setHours(17, 0, 0)); // 05:00 PM
  const interval = 30; // 30 minutes
  const allTimeSlots = generateTimeSlots(startTime, endTime, interval);

  const timeSlotPromises = allTimeSlots.map(async (slot) => {
    const [start, end] = slot.split(" - ");
    const appointmentData = {
      doctorId,
      timeSlot: slot,
      startTime: new Date(`${date.toDateString()} ${start}`),
      endTime: new Date(`${date.toDateString()} ${end}`),
      status: "pending",
    };
    await Appointment.create(appointmentData);
  });

  await Promise.all(timeSlotPromises);
};
export const getAvailableTimeSlots = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const appointments = await Appointment.find({
      doctorId,
      status: "pending",
    });
    return res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAppointmentsByDoctorId = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      const appointments = await Appointment.find({
        doctorId,
        status: { $ne: "pending" },
      });
      if (appointments) {
        const transformAppointments = await Promise.all(
          appointments.map(async (appointment) => {
            return appointmentTransformation(appointment);
          })
        );
        return res.status(200).json({
          status: "success",
          data: transformAppointments,
        });
      }
    } else {
      return res.status(404).json({
        status: "fail",
        message: "No Doctor Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment) {
      return res.status(200).json({
        status: "success",
        data: appointmentTransformation(appointment),
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAppointmentsByPatientId = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient Not Found",
      });
    }
    const appointments = await Appointment.find({ userId: patientId });
    if (appointments.length > 0) {
      const transformAppointments = await Promise.all(
        appointments.map(async (appointment) => {
          return appointmentTransformation(appointment);
        })
      );
      res.status(200).json({
        status: "success",
        data: transformAppointments,
      });
    } else {
      return res.status(200).json({
        status: "fail",
        data: [],
        message: "No Appointments Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const createAppointmentForPatient = async (req, res) => {
  const { doctorId, userId, date } = req.body; // Assume date is provided for appointment creation
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(userId);
    if (!doctor || !patient) {
      return res
        .status(404)
        .json({ status: "fail", message: "Doctor or patient not found" });
    }

    // Generate and store time slots for the given date
    await generateAndStoreTimeSlots(doctorId, new Date(date));

    return res
      .status(201)
      .json({
        status: "success",
        message: "Appointments created and time slots generated",
      });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
export const updateAppointment = async (req, res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndUpdate(
      appointmentData._id,
      appointmentData
    );
    res.status(200).json({
      status: "success",
      data: appointmentTransformation(newAppointment),
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deleteAppointment = async (req, res) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await Appointment.findByIdAndDelete(
      appointmentData._id
    );
    res.status(200).json({
      status: "success",
      data: appointmentTransformation(newAppointment),
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status, userId } = req.body;
  console.log(appointmentId, status, userId);
  try {
    let appointment;
    if (userId) {
      appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status, userId, type: "patient" },
        { new: true }
      );
    } else {
      appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
    }
    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }
    return res
      .status(200)
      .json({
        status: "success",
        data: appointmentTransformation(appointment),
      });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

const setupDailyTimeSlotsForAllDoctors = async () => {
  const doctors = await Doctor.find();
  const today = new Date();
  for (const doctor of doctors) {
    await generateAndStoreTimeSlots(doctor._id, today);
  }
};
// Call this function as needed, possibly on a daily schedule
setupDailyTimeSlotsForAllDoctors();
