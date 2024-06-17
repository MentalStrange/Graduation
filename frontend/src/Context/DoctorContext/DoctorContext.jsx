/* eslint-disable react/prop-types */
import { createContext} from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const DoctorContext = createContext();
const token = localStorage.getItem('userToken');
const doctor = decodeToken(token);

export const DoctorProvider = ({ children }) => {
  const { data: doctorData, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor/${doctor.id}`);

  return (
    <DoctorContext.Provider value={{ doctorData, loading, error }}>
      {children}
    </DoctorContext.Provider>
  );
};