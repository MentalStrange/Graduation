/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorScansContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const DoctorScansProvider = ({ children }) => {
  const { data: scans, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}/scans`);

  return (
    <DoctorScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </DoctorScansContext.Provider>
  );
};
