/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorReportsContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const ReportsProvider = ({ children }) => {
  const { data: reports, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}/reports`);

  return (
    <DoctorReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </DoctorReportsContext.Provider>
  );
};
