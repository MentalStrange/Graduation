import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import WorkingArea from "./Components/Chat/WorkingArea";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />;
      <Route path="/chat" element={<Chat />} />;
      <Route path="/chat/:id" element={<WorkingArea />} />;
    </>
  )
);

export default router;
