import axios from 'axios'
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'

const baseURL = 'http://localhost:3000'

let token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` }
})

axiosInstance.interceptors.request.use(async (req) => {
  token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
  req.headers.Authorization = `Bearer ${token}`
  const user = jwt_decode(token)
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
  if (!isExpired) return req
  //if the token is expired then get a new one
  else {
    console.log('token expired')
    req.headers.Authorization = `Bearer ${token}`
    const response = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )
    localStorage.setItem('jwt', response.data['jwt'])
    req.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    console.log('token created')
    return req
  }
})

export default axiosInstance
