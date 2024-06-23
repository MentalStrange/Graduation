// router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Chat from "./Pages/Chat";
import DoctorPanel from "./Components/Panels/Doctor/DoctorPanel";
import Layout from "./Components/Panels/Layout";
import PatientPanel from "./Components/Panels/Patient/PatientPanel";
import PatientAppointments from "./Components/Panels/Patient/Appointments/PatientAppointments";
import DoctorAppointments from "./Components/Panels/Doctor/Appointment/DoctorAppointments";
import ReceptionistPanel from "./Components/Panels/Receptionist/ReceptionistPanel";
import AddNewDoctor from "./Components/Panels/Receptionist/AddNewOne/AddNewDoctor";
import AddNewRadiologyCenter from "./Components/Panels/Receptionist/AddNewOne/AddNewRadiologyCenter";
import AddNewRadiologist from "./Components/Panels/Receptionist/AddNewOne/AddNewRadiologist";
import RadiologyCenterPanel from "./Components/Panels/RadiologyCenter/RadiologyCenterPanel";
import RadiologistPanel from "./Components/Panels/Radiologist/RadiologistPanel";
import DoctorPrescriptions from "./Components/Panels/Doctor/Prescription/DoctorPrescriptions";
import PatientPrescriptions from "./Components/Panels/Patient/Prescriptions/PatientPrescriptions";
import PatientReports from "./Components/Panels/Patient/Report/PatientReports";
import PatientDoctors from "./Components/Panels/Patient/Doctors/PatientDoctors";
import ReceptionistRadiologist from "./Components/Panels/Receptionist/Radiologists/ReceptionistRadiologist";
import ReceptionistDoctors from "./Components/Panels/Receptionist/Doctors/ReceptionistDoctors";
import ReceptionistRadiologyCenter from "./Components/Panels/Receptionist/RadiologyCenter/ReceptionistRadiologyCenter";
import RadiologyCenterAppointments from "./Components/Panels/RadiologyCenter/Appointments/RadiologyCenterAppointments";
import RadiologyCenterReports from "./Components/Panels/RadiologyCenter/Reports/RadiologyCenterReports";
import RadiologyCenterScans from "./Components/Panels/RadiologyCenter/Scans/RadiologyCenterScans";
import RadiologyCenterRadiologists from "./Components/Panels/RadiologyCenter/Radiologist/RadiologyCenterRadiologist";
import PatientScans from "./Components/Panels/Patient/Scans/PatientScans";
import DoctorPatient from "./Components/Panels/Doctor/Patient/DoctorPatient";
import DoctorPatientPage from "./Components/Panels/Doctor/Patient/DoctorPatientPage";
import MakeScan from "./Components/Panels/Radiologist/Scans/MakeScan";
import PatientScansPage from "./Components/Panels/Radiologist/Scans/PatientScansPage";
import Auth from "./Pages/Auth";
import AuthGuard from "./Components/Guards/AuthGuard";
import Logout from "./Pages/Logout";
import PatientRadiologyCenterAppointments from "./Components/Panels/Patient/RadiologyCenterAppointments/PatientRadiologyCenterAppointments";
import RadiologyCenterPatients from "./Components/Panels/RadiologyCenter/Patients/RadiologyCenterPatients";
import RadiologistPatients from "./Components/Panels/Radiologist/Patients/RadiologistPatients";
import RadiologistScans from "./Components/Panels/Radiologist/Scans/RadiologistScans";
import RadiologistReports from "./Components/Panels/Radiologist/Reports/RadiologistReports";
import { DoctorProvider } from "./Context/DoctorContext/DoctorContext";
import DoctorPanelWorkingArea from "./Components/Panels/Doctor/DoctorPanelWorkingArea";
import { PatientProvider } from "./Context/PatientContext/PatientContext";
import PatientPanelWorkingArea from "./Components/Panels/Patient/PatientPanelWorkingArea";
import { RadiologyCenterProvider } from "./Context/RadiologyCenterContext/RadiologyCenterContext";
import RadiologyCenterWorkingArea from "./Components/Panels/RadiologyCenter/RadiologyCenterWorkingArea";
import RadiologistWorkingArea from "./Components/Panels/Radiologist/RadiologistWorkingArea";
import { RadiologistProvider } from "./Context/RadiologistContext/RadiologistContext";
import RadiologistPatientPage from "./Components/Panels/Radiologist/Patients/RadiologistPatientPage";
import ResultBinaryModel from "./Components/Questions/ResultBinaryModel";
import Questions from "./Pages/Questions";
import Home from "./Pages/Home";
import { ReceptionistProvider } from "./Context/ReceptionistContext.jsx/ReceptionistContext";
import ReceptionistWorkingArea from "./Components/Panels/Receptionist/ReceptionistWorkingArea";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/result" element={<ResultBinaryModel />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<Layout />}>
        <Route
          path="/panel/doctor"
          element={
            <AuthGuard>
              <DoctorProvider>
                <DoctorPanel />
              </DoctorProvider>
            </AuthGuard>
          }
        >
          <Route index element={<DoctorPanelWorkingArea />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatient />} ></Route>
          <Route path="/panel/doctor/chat" element={<Chat />} />
          <Route path="patients/:patientId" element={<DoctorPatientPage />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
        </Route>
        <Route
          path="/panel/patient"
          element={
            <AuthGuard>
              <PatientProvider>
                <PatientPanel />
              </PatientProvider>
            </AuthGuard>
          }
        >
          <Route index element={<PatientPanelWorkingArea />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route
            path="radiologyCenter"
            element={<PatientRadiologyCenterAppointments />}
          />
          <Route path="/panel/patient/chat" element={<Chat />} />
          <Route path="reports" element={<PatientReports />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="scans" element={<PatientScans />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route
          path="/panel/receptionist"
          element={
            <AuthGuard>
              <ReceptionistProvider>
                <ReceptionistPanel />
              </ReceptionistProvider>
            </AuthGuard>
          }
        >
          <Route index element={<ReceptionistWorkingArea />} />
          <Route path="doctors" element={<ReceptionistDoctors />} />
          <Route
            path="radiologyCenters"
            element={<ReceptionistRadiologyCenter />}
          />
          <Route path="radiologists" element={<ReceptionistRadiologist />} />
          <Route path="addNewDoctor" element={<AddNewDoctor />} />
          <Route
            path="addNewRadiologyCenter"
            element={<AddNewRadiologyCenter />}
          />
          <Route path="addNewRadiologist" element={<AddNewRadiologist />} />
        </Route>
        <Route
          path="/panel/radiologyCenter"
          element={
            <AuthGuard>
              <RadiologyCenterProvider>
                <RadiologyCenterPanel />
              </RadiologyCenterProvider>
            </AuthGuard>
          }
        >
          <Route index element={<RadiologyCenterWorkingArea/>} />
          <Route
            path="appointments"
            element={<RadiologyCenterAppointments />}
          />
          <Route path="reports" element={<RadiologyCenterReports />} />
          <Route path="scans" element={<RadiologyCenterScans />} />
          <Route
            path="radiologists"
            element={<RadiologyCenterRadiologists />}
          />
          <Route path="patients" element={<RadiologyCenterPatients />} />
        </Route>
        <Route
          path="/panel/radiologist"
          element={
            <AuthGuard>
              <RadiologistProvider>
                <RadiologistPanel />
              </RadiologistProvider>
            </AuthGuard>
          }
        >
          <Route index element={<RadiologistWorkingArea />} />
          <Route path="patients" element={<RadiologistPatients />} />
          <Route path="patients/:patientId" element={<RadiologistPatientPage />} />
          <Route path="scans" element={<RadiologistScans />} />
          <Route path="scans/:patientId" element={<PatientScansPage />} />
          <Route path="patients/:patientId/makeScan" element={<MakeScan />} />
          <Route path='makeScan' element={<MakeScan />} />
          <Route path="reports" element={<RadiologistReports />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
