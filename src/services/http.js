import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000', // backend của bạn
})

// 👇 TỰ ĐỘNG GẮN TOKEN
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default http
