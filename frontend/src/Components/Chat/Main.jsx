import { Box } from "@chakra-ui/react";
import "./../../styles/ChatStyles/chatPage.css";
import Sidebar from "./Sidebar";
import WorkingArea from "./WorkingArea";
import PanelSidebar from "../Panels/PanelSidebar";
import { useState } from "react";
const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Box className="main-container">
        <PanelSidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar}/>
        <Sidebar />
        <WorkingArea />
      </Box>
    </>
  );
};

export default Main;
