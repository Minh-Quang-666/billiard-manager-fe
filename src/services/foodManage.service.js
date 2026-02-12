import http from './http'

export const getFoods = async () =>
  (await http.get('/foods')).data

export const addFood = (data) =>
  http.post('/foods', data)

export const updateFood = (id, data) =>
  http.put(`/foods/${id}`, data)

export const deleteFood = (id) =>
  http.delete(`/foods/${id}`)
