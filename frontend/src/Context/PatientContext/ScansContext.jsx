/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ScansContext = createContext();
const token = localStorage.getItem('userToken');
const patient = decodeToken(token);

export const ScansProvider = ({ children }) => {
  const { data: scans, loading, error } = useFetch(`http://localhost:5000/api/v1/scan/patient/${patient.id}`);

  return (
    <ScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </ScansContext.Provider>
  );
};

export const useScans = () => useContext(ScansContext);