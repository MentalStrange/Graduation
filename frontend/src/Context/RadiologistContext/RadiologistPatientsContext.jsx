/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';

export const RadiologistPatientsContext = createContext();

export const RadiologistPatientsProvider = ({ children }) => {
  const { data: patients, loading, error } = useFetch('http://localhost:5001/api/v1/radiologist/patients');

  return (
    <RadiologistPatientsContext.Provider value={{ patients, loading, error }}>
      {children}
    </RadiologistPatientsContext.Provider>
  );
};
