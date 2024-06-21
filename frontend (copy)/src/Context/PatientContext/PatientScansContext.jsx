/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';  // Use axios for consistency with ReceptionistContext
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ScansContext = createContext();

export const ScansProvider = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const patient = decodeToken(token);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patient || !patient.id) {
      console.error("Patient ID is null, cannot fetch scans.");
      setError(new Error("Patient ID is null"));
      setLoading(false);
      return;
    }

    const fetchScans = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/scan/patient/${patient.id}`);
        setScans(response.data || []);  // Ensure data is an array, fallback to empty array
      } catch (err) {
        console.error("Error fetching scans:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, [patient?.id]);  // Dependency on patient.id to re-fetch when it changes

  return (
    <ScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </ScansContext.Provider>
  );
};

export const useScans = () => useContext(ScansContext);