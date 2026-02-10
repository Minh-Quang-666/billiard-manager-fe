import axios from 'axios'
const API = 'http://localhost:8000'

export const getCues = async () =>
  (await axios.get(`${API}/cues`)).data

export const addCue = (data) =>
  axios.post(`${API}/cues`, data)

export const updateCue = (id, data) =>
  axios.put(`${API}/cues/${id}`, data)

export const deleteCue = (id) =>
  axios.delete(`${API}/cues/${id}`)
