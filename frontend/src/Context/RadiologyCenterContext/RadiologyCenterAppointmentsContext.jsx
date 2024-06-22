/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologyCenterAppointmentsContext = createContext();
const token = localStorage.getItem('userToken');
const radiologyCenterId = decodeToken(token);
export const RadiologyCenterAppointmentsProvider = ({ children }) => {
  const { data: appointments, loading, error } = useFetch(`http://localhost:5001/api/v1/appointment/radiologyCenter/${radiologyCenterId.id}`);
  return (
    <RadiologyCenterAppointmentsContext.Provider value={{ appointments, loading, error }}>
      {children}
    </RadiologyCenterAppointmentsContext.Provider>
  );
};