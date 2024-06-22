/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologistReportsContext = createContext();
const token = localStorage.getItem('userToken');
const radiologist = decodeToken(token);

export const RadiologistReportsProvider = ({ children }) => {
  const { data: reports, loading, error } = useFetch(`http://localhost:5001/api/v1/report/radiologist/${radiologist.id}`);

  return (
    <RadiologistReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </RadiologistReportsContext.Provider>
  );
};
