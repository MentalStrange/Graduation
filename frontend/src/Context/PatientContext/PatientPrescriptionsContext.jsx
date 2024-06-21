/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const PrescriptionsContext = createContext();

export const PrescriptionsProvider = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const patient = decodeToken(token);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = async () => {
    if (!patient || !patient.id) {
      setError(new Error("Patient ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/prescription/patient/${patient.id}`);
      setPrescriptions(response.data || []);  // Ensure data is an array, fallback to empty array
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [patient?.id]);  // Dependency on patient.id to re-fetch when it changes

  return (
    <PrescriptionsContext.Provider value={{ prescriptions, loading, error }}>
      {children}
    </PrescriptionsContext.Provider>
  );
};