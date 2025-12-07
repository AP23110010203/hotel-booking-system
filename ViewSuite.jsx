import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRoomById } from '../api/api'
import { sampleRooms } from '../data/sampleData'

const ViewSuite = () => {
  const { id } = useParams()
  const [suite, setSuite] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getRoomById(id)
      .then((data) => {
        setSuite(data)
        setStatus('ready')
      })
      .catch(() => {
        const fallback = sampleRooms.find((room) => room.id === id)
        if (fallback) {
          setSuite(fallback)
          setStatus('ready')
        } else {
          setStatus('error')
        }
      })
  }, [id])

  if (status === 'loading') {
    return (
      <main className="suite-view">
        <div style={{ padding: '5vw', zIndex: 10, position: 'relative' }}>
          <p className="alert">Curating suite experience...</p>
        </div>
      </main>
    )
  }

  if (status === 'error' || !suite) {
    return (
      <main className="suite-view">
        <div style={{ padding: '5vw', zIndex: 10, position: 'relative' }}>
          <p className="alert">We couldn't find that suite.</p>
          <Link to="/rooms" className="btn ghost">
            Back to suites
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="suite-view">
      <section className="suite-hero">
        <div
          className="suite-hero__media"
          style={{ backgroundImage: `url(${suite.image})` }}
        >
          <div className="suite-hero__badge">{suite.type}</div>
        </div>
        <div className="suite-hero__content">
          <p className="eyebrow">View Suite</p>
          <h1>{suite.name}</h1>
          <p>{suite.description}</p>
          <div className="suite-meta">
            <span>{suite.size} sqm</span>
            <span>·</span>
            <span>Up to {suite.capacity} guests</span>
            <span>·</span>
            <span>${suite.price}/night</span>
          </div>
          <div className="suite-actions">
            <Link to={`/booking?roomId=${suite.id}`} className="btn primary">
              Book this suite
            </Link>
            <Link to="/rooms" className="btn ghost">
              Explore more suites
            </Link>
          </div>
        </div>
      </section>

      <section className="suite-amenities">
        <h2>Amenities & Rituals</h2>
        <div className="amenities-grid">
          {suite.amenities.map((item) => (
            <div className="amenity-pill" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="suite-story">
        <div>
          <p className="eyebrow">Blue Horizon Escape concierge</p>
          <h3>Every stay is choreographed.</h3>
        </div>
        <p>
          Sunrise wake-up rituals, midnight mixology, reef expeditions, and
          sunset cinema are curated by your dedicated host. Let us know your
          mood, and we craft the day to match.
        </p>
      </section>
    </main>
  )
}

export default ViewSuite

