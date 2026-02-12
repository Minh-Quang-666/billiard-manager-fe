import http from './http'

export const loginApi = async (username, password) => {
  const res = await http.post('/auth/login', {
    username,
    password
  })
  return res.data
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const logoutApi = async () => {
  const token = localStorage.getItem('token')
  await http.post('/auth/logout', token)
  localStorage.removeItem('token')
}
