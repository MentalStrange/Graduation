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
import RadiologistPanel from "./Components/Panels/Radiologist/RadiologistPanel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />;
      <Route path="/chat" element={<Chat />} />;
      <Route path="/chat/:id" element={<WorkingArea />} />;
      <Route path="/panel">
        {/* <Route path="/doctor" element={<DoctorPanel />} />
        <Route path="/radiologist" element={<RadiologistPanel />} /> */}
      </Route>
    </>
  )
);

export default router;
