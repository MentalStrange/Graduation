import { useContext } from "react"
import { AuthContext } from "../../Context/AuthenticationContext"
import { useNavigate } from "react-router-dom";

function AuthGuard({children}) {
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  if(!isAuthenticated) {
    navigate("/auth");
  }
  return children;
}

export default AuthGuard;