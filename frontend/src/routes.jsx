import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Auth from "./Pages/Auth";
import DoctorPanel from "./Components/Panels/Doctor/DoctorPanel";
import Layout from "./Components/Panels/Layout";
import Questions from "./Pages/Questions";
import PatientPanel from "./Components/Panels/Patient/PatientPanel";
import PatientAppointments from "./Components/Panels/Patient/Appointments/PatientAppointments";
import DoctorAppointments from "./Components/Panels/Doctor/Appointment/DoctorAppointments";
import ReceptionistPanel from "./Components/Panels/Receptionist/ReceptionistPanel";
import AddNewDoctor from "./Components/Panels/Receptionist/AddNewOne/AddNewDoctor";
import AddNewRadiologyCenter from "./Components/Panels/Receptionist/AddNewOne/AddNewRadiologyCenter";
import AddNewRadiologist from "./Components/Panels/Receptionist/AddNewOne/AddNewRadiologist";
import RadiologyCenterPanel from "./Components/Panels/RadiologyCenter/RadiologyCenterPanel";
import RadiologistPanel from "./Components/Panels/Radiologist/RadiologistPanel";
import DoctorPanelWorkingArea from "./Components/Panels/Doctor/DoctorPanelWorkingArea";
import DoctorReports from "./Components/Panels/Doctor/Report/DoctorReport"; // Assuming you have this component
import DoctorPrescriptions from "./Components/Panels/Doctor/Prescription/DoctorPrescriptions";
import PatientPanelWorkingArea from "./Components/Panels/Patient/PatientPanelWorkingArea";
import PatientPrescriptions from "./Components/Panels/Patient/Prescriptions/PatientPrescriptions";
import PatientReports from "./Components/Panels/Patient/Report/PatientReports";
import PatientDoctors from "./Components/Panels/Patient/Doctors/PatientDoctors";
import ReceptionistWorkingArea from "./Components/Panels/Receptionist/ReceptionistWorkingArea";
import ReceptionistRadiologist from "./Components/Panels/Receptionist/Radiologists/ReceptionistRadiologist";
import ReceptionistDoctors from "./Components/Panels/Receptionist/Doctors/ReceptionistDoctors";
import ReceptionistRadiologyCenter from "./Components/Panels/Receptionist/RadiologyCenter/ReceptionistRadiologyCenter";
import RadiologyCenterWorkingArea from "./Components/Panels/RadiologyCenter/RadiologyCenterWorkingArea";
import RadiologyCenterAppointments from "./Components/Panels/RadiologyCenter/Appointments/RadiologyCenterAppointments";
import MakeScan from "./Components/Panels/RadiologyCenter/Scans/MakeScan";
import RadiologyCenterReports from "./Components/Panels/RadiologyCenter/Reports/RadiologyCenterReports";
import RadiologyCenterScans from "./Components/Panels/RadiologyCenter/Scans/RadiologyCenterScans";
import RadiologyCenterRadiologists from "./Components/Panels/RadiologyCenter/Radiologist/RadiologyCenterRadiologist";
import { AppointmentsProvider } from "./Context/PatientContext/AppointmentContext";
import { DoctorsProvider } from "./Context/PatientContext/DoctorsContext";
import { ReportsProvider } from "./Context/PatientContext/ReportsContext";
import { PatientProvider } from "./Context/PatientContext/PatientContext";
import Logout from "./Pages/Logout";
import { PrescriptionsProvider } from "./Context/PatientContext/PrescriptionsContext";
import { ScansProvider } from "./Context/PatientContext/ScansContext";
import PatientScans from "./Components/Panels/Patient/Scans/PatientScans";
import DoctorAppointmentsProvider from './Context/DoctorContext/DoctorAppointmentsContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route element={
      
      <PatientProvider>
        <Layout />
      </PatientProvider>
        }>
        <Route path="/panel/doctor" element={
          <DoctorAppointmentsProvider>
            <DoctorPanel />
          </DoctorAppointmentsProvider>
        }>
          <Route index element={<DoctorPanelWorkingArea />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<PatientAppointments />} />
          <Route path="reports" element={<DoctorReports />} />
          <Route path="scans" element={<div>Scans</div>} />
          <Route path="prescriptions" element={<DoctorPrescriptions/>} />
        </Route>
        <Route
          path="/panel/patient"
          element={
            <AppointmentsProvider>
              <DoctorsProvider>
                <ReportsProvider>
                  <PrescriptionsProvider>
                    <ScansProvider>
                      <PatientPanel />
                    </ScansProvider>
                  </PrescriptionsProvider>
                </ReportsProvider>
              </DoctorsProvider>
            </AppointmentsProvider>
          }
        >
          <Route index element={<PatientPanelWorkingArea/>} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<PatientPrescriptions/>} />
          <Route path="reports" element={<PatientReports/>} />
          <Route path='doctors' element={<PatientDoctors/>} />
          <Route path="scans" element={<PatientScans/>} />
          <Route path="chat" element={<div>Chat</div>} />
        </Route>
        <Route path="/panel/receptionist" element={<ReceptionistPanel />}>
          <Route index element={<ReceptionistWorkingArea/>} />
          <Route path="doctors" element={<ReceptionistDoctors />} />
          <Route path="radiologyCenters" element={<ReceptionistRadiologyCenter />} />
          <Route path="radiologists" element={<ReceptionistRadiologist />} />
          <Route path="addNewDoctor" element={<AddNewDoctor />}/>
          <Route path="addNewRadiologyCenter" element={<AddNewRadiologyCenter />} />
          <Route path= "addNewRadiologist" element={<AddNewRadiologist />} />
        </Route>
        <Route path="/panel/radiologyCenter" element={<RadiologyCenterPanel />}>
          <Route index element={<RadiologyCenterWorkingArea/>} />
          <Route path="appointments" element={<RadiologyCenterAppointments />} />
          <Route path="makeScan" element={<MakeScan/>} />
          <Route path="reports" element={<RadiologyCenterReports/>} />
          <Route path="scans" element={<RadiologyCenterScans/>}/>
          <Route path="radiologists" element={<RadiologyCenterRadiologists/>} />
        </Route>
        <Route path="/panel/radiologist" element={<RadiologistPanel />}/>
      </Route>
      <Route path="/questions" element={<Questions />}/>
      <Route path="/logout" element={<Logout />} />
    </>
  )
);

export default router;