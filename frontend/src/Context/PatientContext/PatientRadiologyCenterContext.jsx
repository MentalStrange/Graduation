/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback } from 'react';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const PatientRadiologyCenterContext = createContext();
const token = localStorage.getItem('userToken');
const patient = decodeToken(token);

export const PatientRadiologyCenterProvider = ({ children }) => {
  const { data: radiologyCenters, loading, error } = useFetch(`http://localhost:5001/api/v1/radiologyCenter`);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = useCallback(async () => {
    if (!patient) {
      console.error("Patient data is not available.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/radiologyCenter/appointment/patient/${patient.id}`);
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [patient]);

  useEffect(() => {
    if (patient) {
      fetchAppointments();
    }
  }, [fetchAppointments]);

  return (
    <PatientRadiologyCenterContext.Provider value={{ radiologyCenters, loading, error, appointments, setAppointments, fetchAppointments }}>
      {children}
    </PatientRadiologyCenterContext.Provider>
  );
};
