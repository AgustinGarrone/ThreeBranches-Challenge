import axios from 'axios'

const api = axios.create({
    baseURL:"http://18.230.145.82/api/v1",
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials:false
  })
  
  export default api
  