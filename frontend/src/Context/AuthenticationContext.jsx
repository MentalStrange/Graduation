import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { decodeToken } from "../../Utils/JWT_Decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = decodeToken(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({ isAuthenticated: true, user: { role: decoded.role } });
        } else {
          localStorage.removeItem("userToken");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("userToken");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    const decoded = decodeToken(token);
    setAuth({ isAuthenticated: true, user: { role: decoded.role } });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
