import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
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
import RadiologyCenterReports from "./Components/Panels/RadiologyCenter/Reports/RadiologyCenterReports";
import RadiologyCenterScans from "./Components/Panels/RadiologyCenter/Scans/RadiologyCenterScans";
import RadiologyCenterRadiologists from "./Components/Panels/RadiologyCenter/Radiologist/RadiologyCenterRadiologist";
import { AppointmentsProvider } from "./Context/PatientContext/PatientAppointmentContext";
import { DoctorsProvider } from "./Context/PatientContext/PatientDoctorsContext";
import { ReportsProvider } from "./Context/PatientContext/PatientReportsContext";
import { PatientProvider } from "./Context/PatientContext/PatientContext";
import Logout from "./Pages/Logout";
import { PrescriptionsProvider } from "./Context/PatientContext/PatientPrescriptionsContext";
import { ScansProvider } from "./Context/PatientContext/PatientScansContext";
import PatientScans from "./Components/Panels/Patient/Scans/PatientScans";
import DoctorAppointmentsProvider from "./Context/DoctorContext/DoctorAppointmentsContext";
import { DoctorPatientProvider } from "./Context/DoctorContext/DoctorPatientsContext";
import DoctorPatient from "./Components/Panels/Doctor/Patient/DoctorPatient";
import { DoctorReportsProvider } from "./Context/DoctorContext/DoctorReportsContext";
import { DoctorProvider } from "./Context/DoctorContext/DoctorContext";
import { DoctorPrescriptionsProvider } from "./Context/DoctorContext/DoctorPrescriptionsContext";
import ReceptionistRadiologistsProvider from "./Context/ReceptionistContext.jsx/ReceptionistRadiologistsContext";
import ReceptionistDoctorsProvider from "./Context/ReceptionistContext.jsx/ReceptionistDoctorsContext";
import ReceptionistRadiologyCenterProvider from "./Context/ReceptionistContext.jsx/ReceptionistRadiologyCenterContext";
import { ReceptionistProvider } from "./Context/ReceptionistContext.jsx/ReceptionistContext";
import RadiologistPatients from "./Components/Panels/Radiologist/Patients/RadiologistPatients";
import RadiologistScans from "./Components/Panels/Radiologist/Scans/RadiologistScans";
import RadiologistReports from "./Components/Panels/Radiologist/Reports/RadiologistReports";
import RadiologistWorkingArea from "./Components/Panels/Radiologist/RadiologistWorkingArea";
import { RadiologistPatientsProvider } from "./Context/RadiologistContext/RadiologistPatientsContext";
import { RadiologistScansProvider } from "./Context/RadiologistContext/RadiologistScansContext";
import { RadiologistReportsProvider } from "./Context/RadiologistContext/RadiologistReportsContext";
import { RadiologistProvider } from "./Context/RadiologistContext/RadiologistContext";
import { RadiologyCenterRadiologistProvider } from "./Context/RadiologyCenterContext/RadiologyCenterRadiologistContext";
import { RadiologyCenterProvider } from "./Context/RadiologyCenterContext/RadiologyCenterContext";
import { RadiologyCenterAppointmentsProvider } from "./Context/RadiologyCenterContext/RadiologyCenterAppointmentsContext";
import { RadiologyCenterReportsProvider } from "./Context/RadiologyCenterContext/RadiologyCenterReportsContext";
import { RadiologyCenterScansProvider } from "./Context/RadiologyCenterContext/RadiologyCenterScansContext";
import { RadiologyCenterPatientsProvider } from "./Context/RadiologyCenterContext/RadiologyCenterPatientsContext";
import RadiologyCenterPatients from "./Components/Panels/RadiologyCenter/Patients/RadiologyCenterPatients";
import PatientRadiologyCenterAppointments from "./Components/Panels/Patient/RadiologyCenterAppointments/PatientRadiologyCenterAppointments";
import { PatientRadiologyCenterProvider } from "./Context/PatientContext/PatientRadiologyCenterContext";
import Auth from "./Pages/Auth";
import DoctorPatientPage from "./Components/Panels/Doctor/Patient/DoctorPatientPage";
import MakeScan from "./Components/Panels/Radiologist/Scans/MakeScan";
import PatientScansPage from "./Components/Panels/Radiologist/Scans/PatientScansPage";
import { ProtectedRoute } from "../Utils/ProtectedRoute";
import { DoctorScansProvider } from "./Context/DoctorContext/DoctorScansContext";
import { AuthProvider } from "./Context/AuthenticationContext";
import AuthGuard from "./Components/Guards/AuthGuard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route
        path="/auth"
        element={
            <Auth />
        }
      />
      <Route path="/chat" element={<Chat />} />
      <Route
        element={
          // <DoctorProvider>
          /* //   <PatientProvider>
        //     <AppointmentsProvider>
        //       <DoctorReportsProvider>
        //         <DoctorPrescriptionsProvider> */
        <AuthGuard>
            <Layout />
        </AuthGuard>
          /* //         </DoctorPrescriptionsProvider>
        //       </DoctorReportsProvider>
        //     </AppointmentsProvider>
        //   </PatientProvider> */
          // </DoctorProvider>
        }
      >
        <Route
          path="/panel/doctor"
        //   element={
        //   // <ProtectedRoute allowedRoles={["doctor"]} />
        // }
        >
          <Route index element={<DoctorPanel />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatient />} />
          <Route path="patients/:patientId" element={<DoctorPatientPage />} />
          <Route path="reports" element={<DoctorReports />} />
          {/* <Route path="scans" element={<DoctorScans />} /> */}
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
        </Route>
        <Route
          path="/panel/patient"
          // element={<ProtectedRoute allowedRoles={["patient"]} />}
        >
          <Route
            index
            element={
              <AppointmentsProvider>
                <DoctorsProvider>
                  <ReportsProvider>
                    <PrescriptionsProvider>
                      <ScansProvider>
                        <PatientRadiologyCenterProvider>
                          <PatientPanel />
                        </PatientRadiologyCenterProvider>
                      </ScansProvider>
                    </PrescriptionsProvider>
                  </ReportsProvider>
                </DoctorsProvider>
              </AppointmentsProvider>
            }
          />
          {/* <Route index element={<PatientPanelWorkingArea />} /> */}
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route
            path="radiologyCenter"
            element={<PatientRadiologyCenterAppointments />}
          />
          <Route path="reports" element={<PatientReports />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="scans" element={<PatientScans />} />
          <Route path="chat" element={<div>Chat</div>} />
        </Route>
        <Route
          path="/panel/receptionist"
          // element={<ProtectedRoute allowedRoles={["radiologist"]} />}
        >
          <Route
            index
            element={
              <ReceptionistRadiologistsProvider>
                <ReceptionistDoctorsProvider>
                  <ReceptionistRadiologyCenterProvider>
                    <ReceptionistPanel />
                  </ReceptionistRadiologyCenterProvider>
                </ReceptionistDoctorsProvider>
              </ReceptionistRadiologistsProvider>
            }
          />
          {/* <Route index element={<ReceptionistWorkingArea />} /> */}
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
          // element={<ProtectedRoute allowedRoles={["radiologyCenter"]} />}
        >
          <Route
            index
            element={
              <RadiologyCenterRadiologistProvider>
                <RadiologyCenterAppointmentsProvider>
                  <RadiologyCenterReportsProvider>
                    <RadiologyCenterScansProvider>
                      <RadiologyCenterPatientsProvider>
                        <RadiologyCenterPanel />
                      </RadiologyCenterPatientsProvider>
                    </RadiologyCenterScansProvider>
                  </RadiologyCenterReportsProvider>
                </RadiologyCenterAppointmentsProvider>
              </RadiologyCenterRadiologistProvider>
            }
          />
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
          // element={<ProtectedRoute allowedRoles={["radiologist"]} />}
        >
          <Route
            index
            element={
              <RadiologistPatientsProvider>
                <RadiologistScansProvider>
                  <RadiologistReportsProvider>
                    <RadiologistPanel />
                  </RadiologistReportsProvider>
                </RadiologistScansProvider>
              </RadiologistPatientsProvider>
            }
          />
          <Route path="patients" element={<RadiologistPatients />} />
          <Route path="scans" element={<RadiologistScans />} />
          <Route path="scans/:patientId" element={<PatientScansPage />} />
          <Route path="patients/:patientId/makeScan" element={<MakeScan />} />
          <Route path="reports" element={<RadiologistReports />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
      <Route path="/questions" element={<Questions />} />
      <Route path="/logout" element={<Logout />} />
    </>
  )
);

export default router;
