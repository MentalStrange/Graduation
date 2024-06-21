/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologistScansContext = createContext();
const token = localStorage.getItem("userToken");
const radiologistId = decodeToken(token).id;
export const RadiologistScansProvider = ({ children }) => {
  const { data: scans, loading, error } = useFetch(`http://localhost:5001/api/v1/scan/radiologist/${radiologistId}`);

  return (
    <RadiologistScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </RadiologistScansContext.Provider>
  );
};
