import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRoomById } from '../api/api'

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getRoomById(id)
      .then((result) => setRoom(result))
      .catch(() => setError('Suite not found.'))
  }, [id])

  if (error) {
    return (
      <main className="room-details">
        <p className="alert">{error}</p>
        <button className="btn ghost" onClick={() => navigate('/rooms')}>
          Back to rooms
        </button>
      </main>
    )
  }

  if (!room) {
    return (
      <main className="room-details">
        <p className="alert">Loading suite...</p>
      </main>
    )
  }

  return (
    <main className="room-details">
      <section className="room-hero" data-animate="fade">
        <div
          className="room-hero__media"
          style={{ backgroundImage: `url(${room.image})` }}
        />
        <div className="room-hero__text">
          <p className="eyebrow">{room.type}</p>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
          <div className="room-meta">
            <span>{room.size} sqm</span>
            <span>·</span>
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="room-price">
            <strong>${room.price}</strong> / night
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={`/suite/${room.id}`} className="btn ghost">
              View suite
            </Link>
            <Link to={`/booking?roomId=${room.id}`} className="btn primary">
              Book this suite
            </Link>
          </div>
        </div>
      </section>

      <section className="amenities" data-animate="rise">
        <h2>Amenities</h2>
        <ul>
          {room.amenities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="experience" data-animate="float">
        <h2>Experience curator</h2>
        <p>
          Dedicated hosts craft sunrise yoga, reef dives, chef&apos;s tables,
          and heli transfers on demand. Every booking includes luxury sedan
          pickup in Malé, bespoke scent bar, and complimentary sunset cruise.
        </p>
      </section>
    </main>
  )
}

export default RoomDetails

