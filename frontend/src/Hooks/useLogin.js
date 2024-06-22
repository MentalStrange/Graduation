import { useMutation } from 'react-query'
import authApi from '../Api/auth'

function useLogin() {
  useMutation({
    mutationKey:["login"],
    mutationFn: authApi.login
  })
}

export default useLogin