/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ReceptionistDoctorsContext = createContext();
const token = localStorage.getItem('userToken');
const user = token ? decodeToken(token) : null;

export const ReceptionistDoctorsProvider = ({ children }) => {
  const { data: doctors, loading, error } = useFetch(
    user ? `http://localhost:5001/api/v1/doctor` : null
  );

  return (
    <ReceptionistDoctorsContext.Provider value={{ doctors, loading, error }}>
      {children}
    </ReceptionistDoctorsContext.Provider>
  );
};

export default ReceptionistDoctorsProvider;
