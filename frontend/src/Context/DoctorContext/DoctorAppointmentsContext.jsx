/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';
import axios from 'axios';

export const DoctorAppointmentsContext = createContext();

export const DoctorAppointmentsProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [doctorId, setDoctorId] = useState(token ? decodeToken(token)?.id : null);
  const { data: appointments, loading, error } = useFetch(
    doctorId ? `http://localhost:5001/api/v1/appointment/doctor/${doctorId}` : null
  );

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

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.patch('http://localhost:5001/api/v1/appointment/status', {
        appointmentId,
        status
      });

      if (response.status !== 200) {
        throw new Error('Failed to update the appointment status');
      }
      return { success: true };
    } catch (error) {
      console.error('Error updating appointment status:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <DoctorAppointmentsContext.Provider value={{ appointments, loading, error, updateAppointmentStatus }}>
      {children}
    </DoctorAppointmentsContext.Provider>
  );
};

export default DoctorAppointmentsProvider;