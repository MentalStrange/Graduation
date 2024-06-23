/* eslint-disable react/prop-types */
import { Box, VStack, Image, Link, IconButton, useColorModeValue, Text } from "@chakra-ui/react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRole } from "../../Context/PanelSidebarContext";
import logo from "../../assets/Images/logo.png";
import { NavLink } from "react-router-dom";

function PanelSidebar({ onToggle, isOpen }) {
  const { role } = useRole();
  const bg = useColorModeValue("purple.600", "purple.800");

  const renderLinks = (links) => (
    links.map(({ to, label }) => (
      <NavLink to={to} key={to} style={{ textDecoration: "none" }}>
        <Link
          display="flex"
          alignItems="center"
          p={3}
          color="white"
          borderRadius="md"
          _hover={{ bg: "purple.500" }}
          width="100%" 
        >
          {label}
        </Link>
      </NavLink>
    ))
  );

  const linksByRole = {
    doctor: [
      { to: "/panel/doctor", label: "Dashboard" },
      { to: "/panel/doctor/appointments", label: "Appointments" },
      { to: "/panel/doctor/patients", label: "Patients" },
      { to: "/panel/doctor/prescriptions", label: "Prescriptions" },
      { to: "/panel/doctor/settings", label: "Settings" },
      { to: "/logout", label: "Logout" },

    ],
    radiologist: [
      { to: "/panel/radiologist", label: "Dashboard" },
      {to:"/panel/radiologist/patients", label:"Patients"},
      { to: "/panel/radiologist/scans", label: "Scans" },
      {to:"/panel/radiologist/makeScan", label:"Make Scan"},
      { to: "/panel/radiologist/reports", label: "Reports" },
      {to:"/panel/radiologist/chat", label:"Chat"},
      { to: "/panel/radiologist/settings", label: "Settings" },
      { to: "/logout", label: "Logout" },

    ],
    patient: [
      { to: "/panel/patient", label: "Dashboard" },
      { to: "/panel/patient/appointments", label: "Appointments" },
      {to:"/panel/patient/radiologyCenter", label:"Radiology Center Appointments"},
      { to: "/panel/patient/reports", label: "Reports" },
      { to: "/panel/patient/scans", label: "Scans" },
      { to: "/panel/patient/prescriptions", label: "Prescriptions" },
      { to: "/panel/patient/doctors", label: "Doctors" },
      // {to:"/panel/patient/chat", label:"Chat"},
      {to:"/panel/patient/settings", label:"Settings"},
      { to: "/logout", label: "Logout" },
    ],
    radiologyCenter: [
      { to: "/panel/radiologyCenter", label: "Dashboard" },
      { to: "/panel/radiologyCenter/appointments", label: "Appointments" },
      { to: "/panel/radiologyCenter/patients", label: "Patients" },
      { to: "/panel/radiologyCenter/Radiologists", label: "Radiologists" },
      { to: "/panel/radiologyCenter/reports", label: "Reports" },
      { to: "/panel/radiologyCenter/scans", label: "Scans" },
      {to:"/panel/radiologyCenter/settings", label:"Settings"},
      { to: "/logout", label: "Logout" },
    ],
    receptionist: [
      { to: "/panel/receptionist", label: "Dashboard" },
      { to: "/panel/receptionist/radiologists", label: "Radiologists" },
      { to: "/panel/receptionist/doctors", label: "Doctors" },
      { to: "/panel/receptionist/radiologyCenters", label: "Radiology Centers" },
      { to: "/panel/receptionist/addNewDoctor", label: "Add New Doctor" },
      { to: "/panel/receptionist/addNewRadiologist", label: "Add New Radiologist" },
      { to: "/panel/receptionist/addNewRadiologyCenter", label: "Add New Radiology Center" },
      { to: "/logout", label: "Logout" },
    ],
  };

  return (
    <Box display="flex">
      <Box
        w={isOpen ? "240px" : "10px"}
        bg={bg}
        color="white"
        h="100vh"
        transition="width 0.3s ease"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={isOpen ? 4 : 0}
        overflow="hidden" // Ensure no overflow when closed
      >
        <VStack spacing={5} align="stretch">
          <Box display="flex" justifyContent="center" mb={6}>
            {isOpen && <Image src={logo} alt="logo" w="150px" />}
          </Box>
          <VStack align="stretch" spacing={2}>
            {role && isOpen && (
              <>
                <Text fontSize={"10px"} m={0} fontWeight="bold" color="white">SPECIALIZED</Text>
                {renderLinks(linksByRole[role].slice(0, 4))}
                <hr style={{ width: "100%", borderColor: "white" }} />
                <Text fontSize={"10px"} m={0} fontWeight="bold" color="white">GENERAL</Text>
                {renderLinks(linksByRole[role].slice(4, 7))}
                <hr style={{ width: "100%", borderColor: "white" }} />
                <Text fontSize={"10px"} m={0} fontWeight="bold" color="white">SETTINGS</Text>
                {renderLinks(linksByRole[role].slice(7))}
              </>
            )}
          </VStack>
        </VStack>
      </Box>
      <IconButton
        bg={"transparent"}
        _hover={"transparent"}
        _active={"transparent"}
        icon={isOpen ? <ChevronLeftIcon sx={{color:"white"}}/> : <ChevronRightIcon sx={{ color: "purple" }} />}
        onClick={onToggle} 
        position="absolute"
        left={isOpen ? "220px" : "0px"}
        top="18px"
        transform={isOpen ? "translateX(-50%)" : "none"}
        transition="left 0.3s ease"
      />
    </Box>
  );
}

export default PanelSidebar;
