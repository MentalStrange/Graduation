/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';

export const RadiologyCenterPatientsContext = createContext();
export const RadiologyCenterPatientsProvider = ({ children }) => {
  const { data: patients, loading, error } = useFetch(`http://localhost:5001/api/v1/patient`);

  return (
    <RadiologyCenterPatientsContext.Provider value={{ patients, loading, error }}>
      {children}
    </RadiologyCenterPatientsContext.Provider>
  );
};
