import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
function NavbarSidebar() {
  return (
    <div className="sidebar-navbar-container">
      <div>
        <Link>
          <AccountCircleIcon sx={[{fontSize:40}]}/>
        </Link> 
      </div>
      <div>
        <Link>
          <ScienceIcon sx={[{fontSize:40},{marginRight:1}]} />
        </Link>
        <Link>
          <LocalHospitalIcon sx={[{fontSize:40}]}/>
        </Link>
      </div>
    </div>
  );
}

export default NavbarSidebar;
