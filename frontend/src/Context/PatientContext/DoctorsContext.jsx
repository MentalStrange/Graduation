/* eslint-disable react/prop-types */
import  { createContext} from 'react';
import useFetch from '../../Hooks/useFetch';

export const DoctorsContext = createContext();
export const DoctorsProvider = ({ children }) => {
  const { data: doctors, loading, error } = useFetch(`http://localhost:5000/api/v1/doctor`);

  return (
    <DoctorsContext.Provider value={{ doctors, loading, error }}>
      {children}
    </DoctorsContext.Provider>
  );
};