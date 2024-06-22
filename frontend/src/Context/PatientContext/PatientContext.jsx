/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from "react";
import api from "../../Api/Api";
import { decodeToken } from "../../../Utils/JWT_Decode";

const initialState = {
  patient: { data: {} },
  appointments: { data: [] },
  prescriptions: { data: [] },
  scans: { data: [] },
  reports: { data: [] },
  doctors: { data: [] },
  radiologyCenters: { data: [] },
  loading: false,
  radiologyCenterAppointments: { data: [] },
  error: null,
};

const patientReducer = (state, action) => {
  switch (action.type) {
    case "SET_PATIENT":
      return { ...state, patient: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "SET_PRESCRIPTIONS":
      return { ...state, prescriptions: action.payload };
    case "SET_SCANS":
      return { ...state, scans: action.payload };
    case "SET_REPORTS":
      return { ...state, reports: action.payload };
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "SET_RADIOLOGY_CENTERS":
      return { ...state, radiologyCenters: action.payload };
    case "SET_RADIOLOGY_CENTER_APPOINTMENTS":
      return { ...state, radiologyCenterAppointments: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, initialState);
  const token = localStorage.getItem("userToken");
  const patientId = decodeToken(token).id;

  const fetchPatientData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [
        doctorsResponse,
        patientResponse,
        appointmentsResponse,
        prescriptionsResponse,
        scansResponse,
        reportsResponse,
        radiologyCenterAppointmentsResponse,
        radiologyCentersResponse,
      ] = await Promise.all([
        api.get("/doctor"),
        api.get(`/patient/${patientId}`),
        api.get(`/appointment/patient/${patientId}`),
        api.get(`/prescription/patient/${patientId}`),
        api.get(`/scan/patient/${patientId}`),
        api.get(`/report/patient/${patientId}`),
        api.get(`/radiologyCenter/appointment/patient/${patientId}`),
        api.get(`/radiologyCenter`),
      ]);
      dispatch({
        type: "SET_DOCTORS",
        payload: { data: doctorsResponse.data },
      });
      dispatch({
        type: "SET_PATIENT",
        payload: { data: patientResponse.data },
      });
      dispatch({
        type: "SET_APPOINTMENTS",
        payload: { data: appointmentsResponse.data },
      });
      dispatch({
        type: "SET_RADIOLOGY_CENTER_APPOINTMENTS",
        payload: { data: radiologyCenterAppointmentsResponse.data },
      });
      dispatch({
        type: "SET_RADIOLOGY_CENTERS",
        payload: { data: radiologyCentersResponse.data },
      });
      dispatch({
        type: "SET_PRESCRIPTIONS",
        payload: { data: prescriptionsResponse.data },
      });
      dispatch({ type: "SET_SCANS", payload: { data: scansResponse.data } });
      dispatch({
        type: "SET_REPORTS",
        payload: { data: reportsResponse.data },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientState = () => {
  const { state } = useContext(PatientContext);
  return state;
};

export const usePatientDispatch = () => {
  const { dispatch } = useContext(PatientContext);
  return dispatch;
};

export { PatientContext };
