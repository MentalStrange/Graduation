import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if(!BASE_URL){
  throw new Error('The BASE_URL from the environment variable not found')
}

const axiosInstance = axios.create({
  BASE_URL
});

export default axiosInstance;
