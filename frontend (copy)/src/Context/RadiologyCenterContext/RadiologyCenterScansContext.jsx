/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const RadiologyCenterScansContext = createContext();

const token = localStorage.getItem('userToken');
const radiologyCenterId = decodeToken(token).id;

export const RadiologyCenterScansProvider = ({ children }) => {
  const { data: scans, loading, error } = useFetch(`http://localhost:5001/api/v1/scan/radiologyCenter/${radiologyCenterId}`);

  return (
    <RadiologyCenterScansContext.Provider value={{ scans, loading, error }}>
      {children}
    </RadiologyCenterScansContext.Provider>
  );
};

