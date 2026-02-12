import http from './http'

export const getTables = async () =>
  (await http.get('/tables')).data

export const addTable = (data) =>
  http.post('/tables', data)

export const updateTable = (id, data) =>
  http.put(`/tables/${id}`, data)

export const deleteTable = (id) =>
  http.delete(`/tables/${id}`)
