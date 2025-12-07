const BASE_URL = 'http://localhost:5000'

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return response.json()
}

export const getRooms = () => fetch(`${BASE_URL}/rooms`).then(handleResponse)

export const getRoomById = (roomId) =>
  fetch(`${BASE_URL}/rooms/${roomId}`).then(handleResponse)

export const getFacilities = () =>
  fetch(`${BASE_URL}/facilities`).then(handleResponse)

export const registerUser = (user) =>
  fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(handleResponse)

export const getUserByEmail = (email) =>
  fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`).then(
    handleResponse,
  )

export const loginUser = async (email, password) => {
  const response = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(
      email,
    )}&password=${encodeURIComponent(password)}`,
  )
  const users = await handleResponse(response)
  return users[0] ?? null
}


export const getAllBookings = () => 
  fetch(`${BASE_URL}/bookings`).then(handleResponse)

export const getBookingById = (bookingId) =>
  fetch(`${BASE_URL}/bookings/${bookingId}`).then(handleResponse)

export const getUserBookings = (userId) => {
  if (!userId) return Promise.resolve([]);
  return fetch(`${BASE_URL}/bookings?userId=${encodeURIComponent(userId)}`)
    .then(handleResponse)
    .then(bookings => Array.isArray(bookings) ? bookings : [])
    .catch(error => {
      console.error('Error fetching user bookings:', error);
      return [];
    });
}

export const createBooking = (booking) =>
  fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  }).then(handleResponse)

export const updateBooking = (bookingId, bookingData) => {

  const { id, ...updateData } = bookingData;
  return fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  }).then(handleResponse)
}

export const deleteBooking = (bookingId) =>
  fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: 'DELETE',
  }).then(handleResponse)

