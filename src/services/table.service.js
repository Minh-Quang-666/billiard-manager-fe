import axios from 'axios'

const API_URL = 'http://localhost:8000'

export async function getActiveTables() {
  const res = await axios.get(`${API_URL}/active-tables/`)
  return res.data
}

export const getFoods = async () =>
  (await axios.get(`${API_URL}/active-tables/foods`)).data

export const getCues = async () =>
  (await axios.get(`${API_URL}/active-tables/cues`)).data

export const updateFood = (tableId, foodId, quantity) =>
  axios.post(`${API_URL}/active-tables/${tableId}/foods`, {
    food_id: foodId,
    quantity
  })

export const updateCue = (tableId, cueId, quantity) =>
  axios.post(`${API_URL}/active-tables/${tableId}/cues`, {
    cue_id: cueId,
    quantity
  })

export async function checkoutTable(tableId, endTime) {
  const res = await axios.post(
    `${API_URL}/active-tables/${tableId}/checkout`,
    {
      end_time: endTime
    }
  )
  return res.data   // ✅ rất quan trọng
}

export function startTableApi(tableId, payload) {
  return axios.post(
    `${API_URL}/active-tables/${tableId}/start`,
    payload
  )
}