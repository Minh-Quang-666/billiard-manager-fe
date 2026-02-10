import axios from 'axios'
const API = 'http://localhost:8000'

export const getTables = async () =>
  (await axios.get(`${API}/tables`)).data

export const addTable = (data) =>
  axios.post(`${API}/tables`, data)

export const updateTable = (id, data) =>
  axios.put(`${API}/tables/${id}`, data)

export const deleteTable = (id) =>
  axios.delete(`${API}/tables/${id}`)
