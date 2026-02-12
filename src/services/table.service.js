import http from './http'

export async function getActiveTables() {
  const res = await http.get('/active-tables/')
  return res.data
}

export const getFoods = async () =>
  (await http.get('/active-tables/foods')).data

export const getCues = async () =>
  (await http.get('/active-tables/cues')).data

export const updateFood = (tableId, foodId, quantity) =>
  http.post(`/active-tables/${tableId}/foods`, {
    food_id: foodId,
    quantity
  })

export const updateCue = (tableId, cueId, quantity) =>
  http.post(`/active-tables/${tableId}/cues`, {
    cue_id: cueId,
    quantity
  })

export async function checkoutTable(tableId, endTime) {
  const res = await http.post(
    `/active-tables/${tableId}/checkout`,
    { end_time: endTime }
  )
  return res.data
}

export function startTableApi(tableId, payload) {
  return http.post(`/active-tables/${tableId}/start`, payload)
}
