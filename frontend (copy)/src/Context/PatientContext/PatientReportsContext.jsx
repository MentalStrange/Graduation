/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const patient = decodeToken(token);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    if (!patient || !patient.id) {
      setError(new Error("Patient ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/report/patient/${patient.id}`);
      setReports(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [patient?.id]);  // Dependency on patient.id to re-fetch when it changes

  return (
    <ReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </ReportsContext.Provider>
  );
};