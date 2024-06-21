/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';

export const RadiologyCenterRadiologistContext = createContext();

export const RadiologyCenterRadiologistProvider = ({ children }) => {
  const { data: radiologists, loading, error } = useFetch(`http://localhost:5001/api/v1/radiologist`);

  return (
    <RadiologyCenterRadiologistContext.Provider value={{ radiologists, loading, error }}>
      {children}
    </RadiologyCenterRadiologistContext.Provider>
  );
};
