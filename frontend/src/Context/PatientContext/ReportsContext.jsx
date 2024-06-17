/* eslint-disable react/prop-types */
import  { createContext} from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ReportsContext = createContext();
const token = localStorage.getItem('userToken');
const patient = decodeToken(token);
export const ReportsProvider = ({ children }) => {
  const { data: reports, loading, error } = useFetch(`http://localhost:5000/api/v1/report/patient/${patient.id}`);

  return (
    <ReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </ReportsContext.Provider>
  );
};