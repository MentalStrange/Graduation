/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';

export const RadiologyCenterReportsContext = createContext();

export const RadiologyCenterReportsProvider = ({ children }) => {
  const { data: reports, loading, error } = useFetch(`http://localhost:5001/api/v1/report`);

  return (
    <RadiologyCenterReportsContext.Provider value={{ reports, loading, error }}>
      {children}
    </RadiologyCenterReportsContext.Provider>
  );
};
