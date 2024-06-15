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
      { to: "/panel/doctor/schedule", label: "Schedule" },
      { to: "/panel/doctor/patients", label: "Patients" },
    ],
    radiologist: [
      { to: "/panel/radiologist", label: "Dashboard" },
      { to: "/panel/radiologist/reports", label: "Reports" },
      { to: "/panel/radiologist/scans", label: "Scans" },
    ],
    patient: [
      { to: "/panel/patient", label: "Dashboard" },
      { to: "/panel/patient/appointments", label: "Appointments" },
      { to: "/panel/patient/records", label: "Records" },
      { to: "/panel/patient/reports", label: "Reports" },
      { to: "/panel/patient/scans", label: "Scans" },
      { to: "/panel/patient/prescriptions", label: "Prescriptions" },
      { to: "/panel/patient/doctors", label: "Doctors" },
      { to: "/panel/patient/logout", label: "Logout" },
    ],
    radiologyCenter: [
      { to: "/panel/radiologyCenter", label: "Dashboard" },
      { to: "/panel/radiologyCenter/staff", label: "Staff" },
      { to: "/panel/radiologyCenter/equipment", label: "Equipment" },
    ],
    receptionist: [
      { to: "/panel/receptionist", label: "Dashboard" },
      { to: "/panel/receptionist/appointments", label: "Appointments" },
      { to: "/panel/receptionist/patients", label: "Patients" },
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
                <Text fontSize={"10px"} m={0} fontWeight="bold" color="white">ACADEMIC</Text>
                {renderLinks(linksByRole[role].slice(0, 4))}
                <hr style={{ width: "100%", borderColor: "white" }} />
                <Text fontSize={"10px"} m={0} fontWeight="bold" color="white">ADMINISTRATIVE</Text>
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
