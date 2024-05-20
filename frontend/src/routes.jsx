// src/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import WorkingArea from "./Components/Chat/WorkingArea";
import Auth from "./Pages/Auth";
import DoctorPanel from "./Components/Panels/Doctor/DoctorPanel";
import Layout from "./Components/Panels/Layout";
// import RadiologistPanel from "./Components/Panels/Radiologist/RadiologistPanel";
// import PatientPanel from "./Components/Panels/Patient/PatientPanel";
// import RadiologyCenterPanel from "./Components/Panels/RadiologyCenter/RadiologyCenterPanel";
// import ReceptionistPanel from "./Components/Panels/Receptionist/ReceptionistPanel";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<WorkingArea />} />
      <Route element={<Layout />}>
        <Route path="/panel/doctor" element={<DoctorPanel />} />
        {/* <Route path="/panel/radiologist" element={<RadiologistPanel />} />
        <Route path="/panel/patient" element={<PatientPanel />} />
        <Route path="/panel/radiologyCenter" element={<RadiologyCenterPanel />} />
        <Route path="/panel/receptionist" element={<ReceptionistPanel />} /> */}
      </Route>
    </>
  )
);

export default router;
