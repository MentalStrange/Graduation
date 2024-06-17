/* eslint-disable react/prop-types */
import  { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';


export const AppointmentsContext = createContext();
const token = localStorage.getItem('userToken');
const patient = decodeToken(token);
export const AppointmentsProvider = ({ children }) => {
  const { data: appointments, loading, error } = useFetch(`http://localhost:5000/api/v1/appointment/patient/${patient.id}`);

  return (
    <AppointmentsContext.Provider value={{ appointments, loading, error }}>
      {children}
    </AppointmentsContext.Provider>
  );
};