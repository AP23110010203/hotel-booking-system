import { Link } from 'react-router-dom'
import { useRef } from 'react'
import useRevealOnView from '../hooks/useRevealOnView'

const RoomCard = ({ room }) => {
  const cardRef = useRef(null)
  useRevealOnView(cardRef)

  return (
    <article className="room-card" data-animate="rise" ref={cardRef}>
      <div
        className="room-card__media"
        style={{
          backgroundImage: `url(${room.image})`,
        }}
      >
        <span className="room-badge">{room.type}</span>
      </div>
      <div className="room-card__body">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <div className="room-card__meta">
          <span>{room.size} sqm</span>
          <span>·</span>
          <span>Up to {room.capacity} guests</span>
        </div>
        <div className="room-card__footer">
          <strong>${room.price}/night</strong>
          <Link to={`/suite/${room.id}`} className="text-link">
            View suite →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default RoomCard

