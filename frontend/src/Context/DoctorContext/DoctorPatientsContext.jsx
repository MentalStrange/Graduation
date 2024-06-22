/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorPatientsContext = createContext();

export const DoctorPatientProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [doctorId, setDoctorId] = useState(token ? decodeToken(token)?.id : null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchPatients = async () => {
      if (!doctorId) {
        setError(new Error("Doctor ID is null"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/patient/doctor/${doctorId}`);
        setPatients(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId]);

  return (
    <DoctorPatientsContext.Provider value={{ patients, loading, error }}>
      {children}
    </DoctorPatientsContext.Provider>
  );
};
