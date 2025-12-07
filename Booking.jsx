import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { createBooking, getRooms } from '../api/api'

const initialState = {
  checkIn: '',
  checkOut: '',
  guests: 2,
  roomId: '',
  name: '',
  email: '',
  phone: '',
}

const Booking = ({ user }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      // Store the current URL to redirect back after login
      const currentPath = window.location.pathname + window.location.search
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [user, navigate])
  
  // Don't render the booking form if user is not authenticated
  if (!user) {
    return <div className="container mx-auto p-4 text-center">Redirecting to login...</div>
  }
  const [rooms, setRooms] = useState([])
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const preselectedRoom = searchParams.get('roomId')
    if (preselectedRoom) {
      setFormData((prev) => ({ ...prev, roomId: preselectedRoom }))
    }
  }, [searchParams])

  useEffect(() => {
    getRooms()
      .then((data) => setRooms(data))
      .catch(() => setError('Unable to fetch rooms. Please retry.'))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setStatus('')

    const { checkIn, checkOut, guests, roomId, name, email, phone } = formData
    if (!checkIn || !checkOut || !roomId || !name || !email || !phone) {
      setError('Please complete all required fields.')
      return
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.')
      return
    }

    setLoading(true)
    const payload = {
      ...formData,
      guests: Number(guests),
      userId: user?.id ?? null,
      createdAt: new Date().toISOString(),
    }

    createBooking(payload)
      .then(() => {
        setStatus('success')
        setFormData(initialState)
      })
      .catch(() => setError('Unable to place booking. Please try again.'))
      .finally(() => setLoading(false))
  }

  return (
    <main className="booking-page">
      <section className="page-hero">
        <p className="eyebrow">Booking</p>
        <h1>Craft your stay.</h1>
        <p>
          {user
            ? `Welcome back, ${user.name}.`
            : 'Create an account to see your reservations inside the dashboard.'}
        </p>
      </section>

      <form className="booking-form" onSubmit={handleSubmit} data-animate="rise">
        <div className="form-row">
          <label>
            Check-in
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
            />
          </label>
          <label>
            Check-out
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
            />
          </label>
          <label>
            Guests
            <input
              type="number"
              min="1"
              max="6"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Room type
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
          >
            <option value="">Select your sanctuary</option>
            {rooms.map((room) => (
              <option value={room.id} key={room.id}>
                {room.name} — ${room.price}/night
              </option>
            ))}
          </select>
        </label>

        <div className="form-row">
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Sierra Valente"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="sierra@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              placeholder="+44 7890 123 456"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
        </div>

        {error && <p className="alert">{error}</p>}
        {status === 'success' && (
          <p className="success">Booking received.</p>
        )}
        <button className="btn primary w-100" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit booking'}
        </button>
      </form>
    </main>
  )
}

export default Booking

