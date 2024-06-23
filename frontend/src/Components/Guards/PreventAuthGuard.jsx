// PreventAuthGuard.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthenticationContext";

const PreventAuthGuard = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated) {
    switch (user.role) {
      case "doctor":
        return <Navigate to="/panel/doctor" />;
      case "patient":
        return <Navigate to="/panel/patient" />;
      case "radiologist":
        return <Navigate to="/panel/radiologist" />;
      case "radiologyCenter":
        return <Navigate to="/panel/radiologyCenter" />;
      case "receptionist":
        return <Navigate to="/panel/receptionist" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default PreventAuthGuard;
