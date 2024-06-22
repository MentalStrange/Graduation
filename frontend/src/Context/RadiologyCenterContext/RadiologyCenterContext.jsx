/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from 'react';
import api from '../../Api/Api';
import { decodeToken } from '../../../Utils/JWT_Decode';

const initialState = {
  radiologyCenter: { data: {} },
  appointments: { data: [] },
  patients: { data: [] },
  radiologists: { data: [] },
  reports: { data: [] },
  scans: { data: [] },
  loading: false,
  error: null,
};

const radiologyCenterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RADIOLOGY_CENTER':
      return { ...state, radiologyCenter: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'SET_RADIOLOGISTS':
      return { ...state, radiologists: action.payload };
    case 'SET_REPORTS':
      return { ...state, reports: action.payload };
    case 'SET_SCANS':
      return { ...state, scans: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const RadiologyCenterContext = createContext();

export const RadiologyCenterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(radiologyCenterReducer, initialState);
  const token = localStorage.getItem('userToken');
  const radiologyCenterId = decodeToken(token).id;

  const fetchRadiologyCenterData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const radiologyCenterResponse = await api.get(`/radiologyCenter/${radiologyCenterId}`);
      const appointmentsResponse = await api.get(`/appointment/radiologyCenter/${radiologyCenterId}`);
      const patientsResponse = await api.get(`/patient`);
      const radiologistsResponse = await api.get(`/radiologist`);
      const reportsResponse = await api.get(`/report`);
      const scansResponse = await api.get(`/scan/radiologyCenter/${radiologyCenterId}`);
      
      dispatch({ type: 'SET_RADIOLOGY_CENTER', payload: { data: radiologyCenterResponse.data } });
      dispatch({ type: 'SET_APPOINTMENTS', payload: { data: appointmentsResponse.data } });
      dispatch({ type: 'SET_PATIENTS', payload: { data: patientsResponse.data } });
      dispatch({ type: 'SET_RADIOLOGISTS', payload: { data: radiologistsResponse.data } });
      dispatch({ type: 'SET_REPORTS', payload: { data: reportsResponse.data } });
      dispatch({ type: 'SET_SCANS', payload: { data: scansResponse.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchRadiologyCenterData();
  }, []);

  return (
    <RadiologyCenterContext.Provider value={{ state, dispatch }}>
      {children}
    </RadiologyCenterContext.Provider>
  );
};

export const useRadiologyCenterState = () => {
  const { state } = useContext(RadiologyCenterContext);
  return state;
};

export const useRadiologyCenterDispatch = () => {
  const { dispatch } = useContext(RadiologyCenterContext);
  return dispatch;
};

export { RadiologyCenterContext };
