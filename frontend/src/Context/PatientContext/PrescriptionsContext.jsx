/* eslint-disable react/prop-types */
import  { createContext} from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const PrescriptionsContext = createContext();
const token = localStorage.getItem('userToken');
const patient = decodeToken(token);
export const PrescriptionsProvider = ({ children }) => {
  const { data: prescriptions, loading, error } = useFetch(`http://localhost:5000/api/v1/prescription/patient/${patient.id}`);

  return (
    <PrescriptionsContext.Provider value={{ prescriptions, loading, error }}>
      {children}
    </PrescriptionsContext.Provider>
  );
};