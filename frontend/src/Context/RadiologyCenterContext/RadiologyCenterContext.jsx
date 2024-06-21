/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologyCenterContext = createContext();

const token = localStorage.getItem('userToken');
const radiologyCenterId = decodeToken(token)?.id;  // Ensure you are accessing the 'id' property correctly

export const RadiologyCenterProvider = ({ children }) => {
  const [radiologyCenter, setRadiologyCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRadiologyCenterData = async () => {
    if (!radiologyCenterId) {
      setError(new Error("Radiology Center ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/radiologyCenter/${radiologyCenterId}`);
      setRadiologyCenter(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadiologyCenterData();
  }, []);

  return (
    <RadiologyCenterContext.Provider value={{ radiologyCenter, loading, error }}>
      {children}
    </RadiologyCenterContext.Provider>
  );
};
