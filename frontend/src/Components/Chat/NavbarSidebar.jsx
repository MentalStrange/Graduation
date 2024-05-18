import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box } from "@chakra-ui/react";
import "./../../styles/ChatStyles/chatPage.css";

function NavbarSidebar({ onScienceClick, onHospitalClick }) {
  return (
    <Box className="sidebar-navbar-container" shadow={"lg"} p={2} borderRadius={"lg"} width={"100%"}>
      <div>
        <Link>
          <AccountCircleIcon sx={[{ fontSize: 35 },{":hover":{color:"purple"}}]} />
        </Link>
      </div>
      <div>
        <Link to="#" onClick={onScienceClick}>
          <ScienceIcon sx={[{ fontSize: 35, marginRight: 1 },{":hover":{color:"purple"}}]} />
        </Link>
        <Link to="#" onClick={onHospitalClick}>
          <LocalHospitalIcon sx={[{ fontSize: 35, marginRight: 1 },{":hover":{color:"purple"}}] } />
        </Link>
      </div>
    </Box>
  );
}

NavbarSidebar.propTypes = {
  onScienceClick: PropTypes.func.isRequired,
  onHospitalClick: PropTypes.func.isRequired,
};

export default NavbarSidebar;
