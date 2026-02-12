import http from './http'

export const getCues = async () =>
  (await http.get('/cues')).data

export const addCue = (data) =>
  http.post('/cues', data)

export const updateCue = (id, data) =>
  http.put(`/cues/${id}`, data)

export const deleteCue = (id) =>
  http.delete(`/cues/${id}`)
