/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ReceptionistRadiologistsContext = createContext();
const token = localStorage.getItem('userToken');
const user = token ? decodeToken(token) : null;

export const ReceptionistRadiologistsProvider = ({ children }) => {
  const { data: radiologists, loading, error } = useFetch(
    user ? `http://localhost:5001/api/v1/radiologist` : null
  );

  return (
    <ReceptionistRadiologistsContext.Provider value={{ radiologists, loading, error }}>
      {children}
    </ReceptionistRadiologistsContext.Provider>
  );
};

export default ReceptionistRadiologistsProvider;
