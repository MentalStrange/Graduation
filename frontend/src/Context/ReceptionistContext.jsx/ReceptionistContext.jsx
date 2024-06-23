/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from 'react';
import api from '../../Api/Api';
import { decodeToken } from '../../../Utils/JWT_Decode';

const initialState = {
  receptionist: {},
  doctors: [],
  radiologists: [],
  radiologyCenter:[],
  loading: false,
  error: null,
};

const receptionistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECEPTIONIST':
      return { ...state, receptionist: action.payload };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RADIOLOGISTS':
      return { ...state, radiologists: action.payload };
    case 'SET_RADIOLOGY_CENTER':
      return { ...state, radiologyCenter: action.payload };
    default:
      return state;
  }
};

const ReceptionistContext = createContext();

export const ReceptionistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(receptionistReducer, initialState);
  const token = localStorage.getItem('userToken');
  const receptionistId = decodeToken(token).id;

  const fetchReceptionistData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const receptionistResponse = await api.get(`/receptionist/${receptionistId}`);
      const doctorsResponse = await api.get(`/doctor`);
      const radiologistResponse = await api.get(`/radiologist`);
      console.log(radiologistResponse);
      const radiologyCenterResponse = await api.get(`/radiologyCenter`);
      console.log(radiologyCenterResponse);
      
      dispatch({ type: 'SET_RECEPTIONIST', payload: receptionistResponse.data });
      dispatch({ type: 'SET_DOCTORS', payload: doctorsResponse.data });
      dispatch({ type: 'SET_RADIOLOGISTS', payload: radiologistResponse.data });
      dispatch({ type: 'SET_RADIOLOGY_CENTER', payload: radiologyCenterResponse.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchReceptionistData();
  }, []);

  return (
    <ReceptionistContext.Provider value={{ state, dispatch }}>
      {children}
    </ReceptionistContext.Provider>
  );
};

export const useReceptionistState = () => {
  const { state } = useContext(ReceptionistContext);
  return state;
};

export const useReceptionistDispatch = () => {
  const { dispatch } = useContext(ReceptionistContext);
  return dispatch;
};

export { ReceptionistContext };
