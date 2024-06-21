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
import scanRoutes from "./routes/scan.js";
import { createServer } from "http";
import setupSocket from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle JSON requests
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit to handle large base64 images

// Base64 Image upload endpoint
app.post('/upload', (req, res) => {
  const { image, fileName } = req.body;
  if (!image || !fileName) {
    return res.status(400).send('No image or fileName provided.');
  }

  const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return res.status(400).send('Invalid image format.');
  }

  const fileExtension = matches[1].split('/')[1];
  const imageBuffer = Buffer.from(matches[2], 'base64');
  const filePath = path.join('uploads', `${Date.now()}-${fileName}.${fileExtension}`);

  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      return res.status(500).send('Error saving the image.');
    }
    res.status(200).send({ imageUrl: `/uploads/${path.basename(filePath)}` });
  });
});

// Serve the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URL_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// Socket.io
const server = createServer(app);
setupSocket(server);

app.get("/", (req, res) => {
  res.send("<center><h1>Welcome to the Graduation Project</h1></center>");
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
app.use('/api/v1/scan', scanRoutes);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
