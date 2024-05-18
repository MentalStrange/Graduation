import { Box } from "@chakra-ui/react";
import "./../../styles/ChatStyles/chatPage.css";
import Sidebar from "./Sidebar";
import WorkingArea from "./WorkingArea";
const Main = () => {
  return (
    <>
      <Box className="main-container">
        <Sidebar />
        <WorkingArea />
      </Box>
    </>
  );
};

export default Main;
