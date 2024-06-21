/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologistContext = createContext();

const token = localStorage.getItem('userToken');
const radiologistId = decodeToken(token)?.id;  // Ensure you are accessing the 'id' property correctly

export const RadiologistProvider = ({ children }) => {
  const [radiologists, setRadiologists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRadiologistData = async () => {
    if (!radiologistId) {
      setError(new Error("Radiologist ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/radiologist/${radiologistId}`);
      setRadiologists(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadiologistData();
  }, []);

  return (
    <RadiologistContext.Provider value={{ radiologists, loading, error }}>
      {children}
    </RadiologistContext.Provider>
  );
};
