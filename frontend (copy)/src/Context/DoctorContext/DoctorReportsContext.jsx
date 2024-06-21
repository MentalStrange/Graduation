/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorReportsContext = createContext();

export const DoctorReportsProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [doctorId, setDoctorId] = useState(token ? decodeToken(token)?.id : null);
  const { data: reports, loading, error } = useFetch(
    doctorId ? `http://localhost:5001/api/v1/report/doctor/${doctorId}` : null
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
    <DoctorReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </DoctorReportsContext.Provider>
  );
};
