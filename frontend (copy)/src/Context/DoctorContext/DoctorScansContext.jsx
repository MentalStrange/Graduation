/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorScansContext = createContext();

export const DoctorScansProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [doctorId, setDoctorId] = useState(token ? decodeToken(token)?.id : null);
  const { data: scans, loading, error } = useFetch(
    doctorId ? `http://localhost:5001/api/v1/doctor/${doctorId}/scans` : null
  );

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem('userToken');
      setToken(newToken);
      setDoctorId(newToken ? decodeToken(newToken)?.id : null);
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <DoctorScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </DoctorScansContext.Provider>
  );
};
