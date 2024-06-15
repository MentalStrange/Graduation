import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
// import WorkingArea from "./Components/Chat/WorkingArea";
import Auth from "./Pages/Auth";
import DoctorPanel from "./Components/Panels/Doctor/DoctorPanel";
import Layout from "./Components/Panels/Layout";
import Questions from "./Pages/Questions";
import PatientPanel from "./Components/Panels/Patient/PatientPanel";
import PatientAppointments from "./Components/Panels/Patient/Appointments/PatientAppointments";
import DoctorAppointments from "./Components/Panels/Doctor/Appointment/DoctorAppointments";
import ReceptionistPanel from "./Components/Panels/receptionist/ReceptionistPanel";
import AddNewDoctor from "./Components/Panels/receptionist/AddNewOne/AddNewDoctor";
import AddNewRadiologyCenter from "./Components/Panels/receptionist/AddNewOne/AddNewRadiologyCenter";
import AddNewRadiologist from "./Components/Panels/receptionist/AddNewOne/AddNewRadiologist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/panel/doctor/all-appointments" element={<DoctorAppointments />} />
      <Route path="/panel/receptionist/addNewDoctor" element={<AddNewDoctor />}/>
      <Route path="/panel/receptionist/addNewRadiologyCenter" element={<AddNewRadiologyCenter />} />
      <Route path= "/panel/receptionist/addNewRadiologist" element={<AddNewRadiologist />} />
      {/* <Route path="/chat/:id" element={<WorkingArea />} /> */}
      <Route element={<Layout />}>
        <Route path="/panel/doctor" element={<DoctorPanel />} />
        <Route path="/panel/patient" element={<PatientPanel />}/>
        <Route path="/panel/receptionist" element={<ReceptionistPanel />}/>
          {/* <Route path="/appointments" element={<AppointmentsPage />} /> */}
        {/* </Route> */}
        <Route path="/panel/patient/appointments" element={<PatientAppointments />}/>
      </Route>
      <Route path="/questions" element={<Questions />}/>
    </>
  )
);

export default router;
