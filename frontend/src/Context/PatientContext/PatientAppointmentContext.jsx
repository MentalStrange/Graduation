/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const patient = decodeToken(token);

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);  // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/doctor`);
      setDoctors(response.data || []);  // Ensure data is an array, fallback to empty array
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);  // Fallback to empty array on error
    }
  };

  // Fetch appointments for the patient
  const fetchAppointments = useCallback(async () => {
    if (!patient || !patient.id) {
      console.error("Patient ID is null, cannot fetch appointments.");
      setError(new Error("Patient ID is null"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/appointment/patient/${patient.id}`);
      setAppointments(response.data.data || []);  // Ensure data is an array, fallback to empty array
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [patient?.id]);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <AppointmentsContext.Provider value={{ doctors, appointments, loading, error, setAppointments, fetchAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};