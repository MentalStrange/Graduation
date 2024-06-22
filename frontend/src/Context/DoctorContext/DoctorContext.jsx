/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from 'react';
import api from '../../Api/Api';
import { decodeToken } from '../../../Utils/JWT_Decode';

const initialState = {
  doctor: { data: {} },
  appointments: { data: [] },
  patients: { data: [] },
  prescriptions: { data: [] },
  loading: false,
  error: null,
};

const doctorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DOCTOR':
      return { ...state, doctor: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'SET_REPORTS':
      return { ...state, reports: action.payload };
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'SET_PRESCRIPTIONS':
      return { ...state, prescriptions: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorReducer, initialState);
  const token = localStorage.getItem('userToken');
  const doctorId = decodeToken(token).id;

  const fetchDoctorData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const doctorResponse = await api.get(`/doctor/${doctorId}`);
      const appointmentsResponse = await api.get(`/appointment/doctor/${doctorId}`);
      const patientsResponse = await api.get(`/patient/doctor/${doctorId}`);
      const prescriptionsResponse = await api.get(`/prescription/doctor/${doctorId}`);
      dispatch({ type: 'SET_DOCTOR', payload: { data: doctorResponse.data } });
      dispatch({ type: 'SET_APPOINTMENTS', payload: { data: appointmentsResponse.data } });
      dispatch({ type: 'SET_PATIENTS', payload: { data: patientsResponse.data } });
      dispatch({ type: 'SET_PRESCRIPTIONS', payload: { data: prescriptionsResponse.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  return (
    <DoctorContext.Provider value={{ state, dispatch }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorState = () => {
  const { state } = useContext(DoctorContext);
  return state;
};

export const useDoctorDispatch = () => {
  const { dispatch } = useContext(DoctorContext);
  return dispatch;
};

export { DoctorContext };
