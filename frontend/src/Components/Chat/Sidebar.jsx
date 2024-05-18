import { Box, Heading, Input } from "@chakra-ui/react";
import NavbarSidebar from "./NavbarSidebar";
import SearchIcon from "@mui/icons-material/Search";
import ChatMessageList from "./ChatMessageList";
import { Link } from "react-router-dom";
import { useState } from "react";

const hospitalContacts = [
  { name: "Dr. John Doe", title: "Cardiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Jane Smith", title: "Surgeon", img: "https://bit.ly/sage-adebayo" }
];

const radiologistContacts = [
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" }
];

const Sidebar = () => {
  const [contacts, setContacts] = useState(hospitalContacts);

  return (
    <>
      <Box className="sidebar-container">
        <Box m={1}>
          <NavbarSidebar
            onScienceClick={() => setContacts(radiologistContacts)}
            onHospitalClick={() => setContacts(hospitalContacts)}
          />
        </Box>
        <Heading mt={6}>Messages</Heading>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={2}>
          <Link>
            <SearchIcon fontSize="medium" sx={{color:"purple"}}/>
          </Link>
          <Input placeholder="Search" ml={2} />
        </Box>
        <Box>
          <ChatMessageList contacts={contacts} />
        </Box>
      </Box>
    </>
  );
};


export default Sidebar;
