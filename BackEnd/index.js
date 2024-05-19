import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/report.js";
import doctorRoutes from "./routes/doctor.js";
import radiologistRoutes from "./routes/radiologist.js";
import prescriptionRoutes from "./routes/prescriptions.js";
import patientRoutes from "./routes/patient.js";
import radiologyCenterRoutes from "./routes/radiologyCenter.js";
import appointmentRoutes from "./routes/appointment.js";
import http from "http";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware to handle JSON requests
app.use(cors());

app.use(express.json());

// Configure CORS

// Connect to the database
try {
  mongoose.connect(process.env.MONGO_URL_LOCAL);
  console.log("Connected to database");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

// Socket.io
export const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send(
    `<center>
      <h1>Welcome to the Graduation Project</h1>
    </center>`
  );
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/report', reportRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/radiologist', radiologistRoutes);
app.use('/api/v1/prescription', prescriptionRoutes);
app.use('/api/v1/patient', patientRoutes);
app.use('/api/v1/radiologyCenter', radiologyCenterRoutes);
app.use('/api/v1/appointment', appointmentRoutes);


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
