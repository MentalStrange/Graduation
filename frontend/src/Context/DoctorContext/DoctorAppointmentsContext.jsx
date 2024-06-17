/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorAppointmentsContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const AppointmentsProvider = ({ children }) => {
  const { data: appointments, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}/appointments`);

  return (
    <DoctorAppointmentsContext.Provider value={{ appointments, loading, error }}>
      {children}
    </DoctorAppointmentsContext.Provider>
  );
};
