export function handleApiError(error) {
  if (error.response) {
    return error.response.data?.detail || error.response.data || 'Server error'
  }
  if (error.request) {
    return 'Không kết nối được server'
  }
  return error.message
}
