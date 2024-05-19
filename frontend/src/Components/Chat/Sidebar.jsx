import  { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Input } from "@chakra-ui/react";
import NavbarSidebar from "./NavbarSidebar";
import SearchIcon from "@mui/icons-material/Search";
import ChatMessageList from "./ChatMessageList";
import WorkingArea from "./WorkingArea";
import { Link } from "react-router-dom";

const hospitalContacts = [
  { name: "Dr. John Doe", title: "Cardiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Jane Smith", title: "Surgeon", img: "https://bit.ly/sage-adebayo" }
];

const radiologistContacts = [
  { name: "Dr. Alice Brown", title: "Radiologist", img: "https://bit.ly/sage-adebayo" },
  { name: "Dr. Bob Johnson", title: "Radiologist", img: "https://bit.ly/sage-adebayo" }
];

const Sidebar = () => {
  const [contacts, setContacts] = useState(hospitalContacts);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

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
            <SearchIcon fontSize="medium" />
          </Link>
          <Input placeholder="Search" ml={2} />
        </Box>

        <Box>
          <ChatMessageList contacts={contacts} onContactClick={handleContactClick} />
        </Box>
        {/* {selectedContact && (
          <Box mt={4}>
            <WorkingArea contact={selectedContact} />
          </Box>
        )} */}
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ),
};

export default Sidebar;
