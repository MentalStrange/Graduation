import axiosInstance from "./basUrl";

function login(loginDate){
  return axiosInstance.post('/login', loginDate)
}

const authApi = {
  login
}
export default authApi;