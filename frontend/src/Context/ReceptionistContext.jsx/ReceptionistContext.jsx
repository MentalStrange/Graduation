/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { decodeToken } from '../../../Utils/JWT_Decode';
import axios from 'axios';

export const ReceptionistContext = createContext();

const token = localStorage.getItem('userToken');
const receptionistId = decodeToken(token)?.id;  // Ensure you are accessing the 'id' property correctly

export const ReceptionistProvider = ({ children }) => {
  const [receptionist, setReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReceptionistData = async () => {
    if (!receptionistId) {
      console.error("Receptionist ID is null, cannot fetch receptionist data.");
      setError(new Error("Receptionist ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/receptionist/${receptionistId}`);
      setReceptionist(response.data || null);  // Ensure data is handled correctly, fallback to null
    } catch (err) {
      // console.error("Error fetching receptionist data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionistData();
  }, [receptionistId]);  // Dependency on receptionistId to re-fetch when it changes

  return (
    <ReceptionistContext.Provider value={{ receptionist, loading, error }}>
      {children}
    </ReceptionistContext.Provider>
  );
};
