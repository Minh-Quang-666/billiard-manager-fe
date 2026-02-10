import axios from 'axios'
const API = 'http://localhost:8000'

export const getFoods = async () =>
  (await axios.get(`${API}/foods`)).data

export const addFood = (data) =>
  axios.post(`${API}/foods`, data)

export const updateFood = (id, data) =>
  axios.put(`${API}/foods/${id}`, data)

export const deleteFood = (id) =>
  axios.delete(`${API}/foods/${id}`)
