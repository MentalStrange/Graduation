import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { decodeToken } from "../../Utils/JWT_Decode"; // Ensure this function is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = decodeToken(token);
        if (decoded.exp * 1000 > Date.now()) { // Check token expiration
          setAuth({ isAuthenticated: true, user: { role: decoded.role } });
        } else {
          localStorage.removeItem("userToken"); // Remove expired token
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("userToken"); // Remove invalid token
      }
    }
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
