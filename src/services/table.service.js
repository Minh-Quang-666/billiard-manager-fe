import axios from 'axios'

const API_URL = 'http://localhost:8000'

export async function getActiveTables() {
  const res = await axios.get(`${API_URL}/active-tables/`)
  return res.data
}
