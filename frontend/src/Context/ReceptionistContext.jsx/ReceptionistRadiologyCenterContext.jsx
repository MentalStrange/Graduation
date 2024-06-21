/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { decodeToken } from '../../../Utils/JWT_Decode';

export const ReceptionistRadiologyCenterContext = createContext();
const token = localStorage.getItem('userToken');
const user = token ? decodeToken(token) : null;

export const ReceptionistRadiologyCenterProvider = ({ children }) => {
  const { data: radiologyCenter, loading, error } = useFetch(
    user ? `http://localhost:5001/api/v1/radiologyCenter` : null
  );

  return (
    <ReceptionistRadiologyCenterContext.Provider value={{ radiologyCenter, loading, error }}>
      {children}
    </ReceptionistRadiologyCenterContext.Provider>
  );
};

export default ReceptionistRadiologyCenterProvider;
