/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorPatientsContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const PatientsProvider = ({ children }) => {
  const { data: patients, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}/patients`);

  return (
    <DoctorPatientsContext.Provider value={{ patients, loading, error }}>
      {children}
    </DoctorPatientsContext.Provider>
  );
};
