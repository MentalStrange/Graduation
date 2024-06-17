/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const PatientContext = createContext();

const token = localStorage.getItem('userToken');
const patientId = decodeToken(token);
export const PatientProvider = ({ children }) => {
  const { data: patient, loading, error } = useFetch(`http://localhost:5000/api/v1/patient/${patientId.id}`);
  // console.log(patient);
  return (
    <PatientContext.Provider value={{  patient, loading, error }}>
      {children}
    </PatientContext.Provider>
  );
};