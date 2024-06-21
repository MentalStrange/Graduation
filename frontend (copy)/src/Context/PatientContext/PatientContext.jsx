/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { decodeToken } from '../../../Utils/JWT_Decode';
import axios from 'axios';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [patientId, setPatientId] = useState(token ? decodeToken(token) : null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem('userToken');
      setToken(newToken);
      setPatientId(newToken ? decodeToken(newToken) : null);
    };

    // Event listener for local storage changes
    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId || !patientId.id) {
        setError(new Error("Patient ID is null"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/patient/${patientId.id}`);
        setPatient(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId && patientId.id) {
      fetchPatientData();
    }
  }, [patientId]);

  return (
    <PatientContext.Provider value={{ patient, loading, error }}>
      {children}
    </PatientContext.Provider>
  );
};