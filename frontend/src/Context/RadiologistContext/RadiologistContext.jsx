/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from 'react';
import { decodeToken } from '../../../Utils/JWT_Decode';
import api from '../../Api/Api';

const initialState = {
  radiologist: { data: {} },
  scans: { data: [] },
  patients: { data: [] },
  reports: { data: [] },
  loading: false,
  error: null,
};

const radiologistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RADIOLOGIST':
      return { ...state, radiologist: action.payload };
    case 'SET_SCANS':
      return { ...state, scans: action.payload };
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'SET_REPORTS':
      return { ...state, reports: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const RadiologistContext = createContext();

export const RadiologistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(radiologistReducer, initialState);
  const token = localStorage.getItem('userToken');
  const radiologistId = decodeToken(token)?.id;

  const fetchRadiologistData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const radiologistResponse = await api.get(`/radiologist/${radiologistId}`);
      const scansResponse = await api.get(`/scan/radiologist/${radiologistId}`);
      const patientsResponse = await api.get(`/radiologist/${radiologistId}/patients`);
      console.log(patientsResponse);
      const reportsResponse = await api.get(`/report/radiologist/${radiologistId}`);
      dispatch({ type: 'SET_RADIOLOGIST', payload: { data: radiologistResponse.data } });
      dispatch({ type: 'SET_SCANS', payload: { data: scansResponse.data } });
      dispatch({ type: 'SET_PATIENTS', payload: { data: patientsResponse.data } });
      dispatch({ type: 'SET_REPORTS', payload: { data: reportsResponse.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchRadiologistData();
  }, []);

  return (
    <RadiologistContext.Provider value={{ state, dispatch }}>
      {children}
    </RadiologistContext.Provider>
  );
};

export const useRadiologistState = () => {
  const { state } = useContext(RadiologistContext);
  return state;
};

export const useRadiologistDispatch = () => {
  const { dispatch } = useContext(RadiologistContext);
  return dispatch;
};

export { RadiologistContext };
