/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorPrescriptionsContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const PrescriptionsProvider = ({ children }) => {
  const { data: prescriptions, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}/prescriptions`);

  return (
    <DoctorPrescriptionsContext.Provider value={{ prescriptions, loading, error }}>
      {children}
    </DoctorPrescriptionsContext.Provider>
  );
};
