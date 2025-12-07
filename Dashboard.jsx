import { useEffect, useState } from 'react'
import { getUserBookings, updateBooking, deleteBooking } from '../api/api'

const Dashboard = ({ user, onLogout }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingBooking, setEditingBooking] = useState(null)
  const [editForm, setEditForm] = useState({
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0
  })

  const loadBookings = () => {
    if (!user) return
    setLoading(true)
    getUserBookings(user.id)
      .then((data) => setBookings(data))
      .catch(() => setError('Unable to load bookings.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadBookings()
  }, [user])

  const handleEditClick = (booking) => {
    setEditingBooking(booking)
    setEditForm({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'totalPrice' ? parseFloat(value) : value
    }))
  }

  const handleUpdateBooking = async (e) => {
    e.preventDefault()
    if (!editingBooking) return
    
    try {
      setLoading(true)
      const updatedBooking = {
        ...editingBooking,
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        guests: parseInt(editForm.guests)
      }
      
      await updateBooking(editingBooking.id, updatedBooking)
      setEditingBooking(null)
      loadBookings()
      setError('')
    } catch (err) {
      console.error('Update error:', err)
      setError(`Failed to update booking: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return
    }
    
    try {
      setLoading(true)
      await deleteBooking(bookingId)
      setBookings(prev => prev.filter(booking => booking.id !== bookingId))
      setError('')
    } catch (err) {
      setError('Failed to delete booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <div>
          <p className="eyebrow">Guest</p>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
        <button className="btn ghost" onClick={onLogout}>
          Logout
        </button>
      </aside>
      <section className="dashboard__content">
        <div className="dashboard__header">
          <div>
            <p className="eyebrow">Itineraries</p>
            <h1>Your upcoming stays</h1>
          </div>
        </div>
        {loading && <p className="alert">Fetching reservations...</p>}
        {error && <p className="alert">{error}</p>}
        {!loading && !bookings.length && (
          <p className="alert">
            No bookings yet. Create your first retreat from the booking page.
          </p>
        )}
        <div className="booking-list">
          {bookings.map((booking) => (
            <article key={booking.id} className="booking-card">
              <div>
                <p className="eyebrow">{booking.room?.type ?? 'Suite'}</p>
                <h3>{booking.room?.name ?? 'Aurora Suite'}</h3>
              </div>
              <div className="booking-card__dates">
                {editingBooking?.id === booking.id ? (
                  <form onSubmit={handleUpdateBooking} className="edit-form">
                    <div className="form-group">
                      <label>Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={editForm.checkIn}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={editForm.checkOut}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Guests</label>
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="10"
                        value={editForm.guests}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button 
                        type="button" 
                        className="btn ghost" 
                        onClick={() => setEditingBooking(null)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <p className="eyebrow">Check-in</p>
                      <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Check-out</p>
                      <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Guests</p>
                      <p>{booking.guests}</p>
                    </div>
                    <div className="booking-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditClick(booking)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteBooking(booking.id)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
                <span>Check-in: {booking.checkIn}</span>
                <span>Check-out: {booking.checkOut}</span>
              </div>
              <div className="booking-card__guest">
                <span>{booking.guests} guests</span>
                <span>{booking.email}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard

