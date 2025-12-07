import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import FacilityCard from '../components/FacilityCard'
import TextPressure from '../components/TextPressure'
import { getRooms, getFacilities } from '../api/api'
import { sampleRooms, sampleFacilities } from '../data/sampleData'

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [featuredFacilities, setFeaturedFacilities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getRooms(), getFacilities()])
      .then(([rooms, facilities]) => {
        const roomPool = rooms.length ? rooms : sampleRooms
        const facilityPool = facilities.length ? facilities : sampleFacilities
        setFeaturedRooms(roomPool.slice(0, 3))
        setFeaturedFacilities(facilityPool.slice(0, 4))
        if (!rooms.length || !facilities.length) {
          setError('Live highlights unavailable. Showing curated showcases.')
        }
      })
      .catch(() => {
        setFeaturedRooms(sampleRooms.slice(0, 3))
        setFeaturedFacilities(sampleFacilities.slice(0, 4))
        setError('Unable to load highlights right now. Showing curated showcases.')
      })
  }, [])

  return (
    <main className="home">
      <section className="hero hero-video-wrapper" data-parallax>
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-tropical-island-8769/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content" data-animate="fade">
          <div className="hero-brand-text">
            <TextPressure
              text="BLUE HORIZON ESCAPE"
              fontFamily="Manrope"
              fontUrl=""
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#ecf7ff"
              strokeColor="#0ffcbE"
              minFontSize={9}
            />
          </div>
          <h1>Arrival to a world above the Indian Ocean.</h1>
          <p>
            Private seaplanes, champagne sunsets, bespoke itineraries orchestrated
            by your dedicated curator.
          </p>
          <div className="hero-cta">
            <Link to="/booking" className="btn primary">
              Begin your journey
            </Link>
            <Link to="/rooms" className="btn ghost">
              Discover suites
            </Link>
          </div>
        </div>
        <div className="hero-scroll">Scroll to discover</div>
      </section>

      <section className="landing-grid" data-animate="rise">
        <article>
          <p className="eyebrow">Signature transfer</p>
          <h3>Champagne seaplane directly to Mirage Bay.</h3>
        </article>
        <article>
          <p className="eyebrow">Curated dining</p>
          <h3>Nine concepts, from reef-to-table to midnight omakase.</h3>
        </article>
        <article>
          <p className="eyebrow">Private residence</p>
          <h3>Three-bedroom Solstice Residence with glass-bottom spa.</h3>
        </article>
      </section>

      <section className="landing-panorama" data-animate="float">
        <div>
          <p className="eyebrow">Blue Horizon Escape experience</p>
          <h2>Bespoke retreats designed for slow, cinematic living.</h2>
          <p>
            From suspended sunrise yoga to speakeasy mixology under the stars,
            Blue Horizon Escape layers immersive touches into every moment of your stay.
          </p>
        </div>
        <div className="landing-panorama__cta">
          <Link to="/facilities" className="text-link">
            Explore facilities →
          </Link>
          <Link to="/contact" className="btn ghost">
            Speak to concierge
          </Link>
        </div>
      </section>

      <section className="home-panels" data-animate="fade">
        <div>
          <h2>Immersive stays</h2>
          <p>
            Every suite frames the horizon with floor-to-ceiling glass, curated
            scents, and an on-call concierge orchestrating bespoke itineraries.
          </p>
        </div>
        <div className="stats">
          <div>
            <strong>38</strong>
            <span>Ocean suites</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Butler service</span>
          </div>
          <div>
            <strong>9</strong>
            <span>Signature restaurants</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Suites & Residences</p>
            <h2>Handpicked rooms bathed in sunrise gold.</h2>
          </div>
          <Link to="/rooms" className="text-link">
            View all rooms →
          </Link>
        </div>
        {error && <p className="alert">{error}</p>}
        <div className="room-grid">
          {featuredRooms.map((room) => (
            <RoomCard room={room} key={room.id} />
          ))}
        </div>
      </section>

      <section className="home-section alt">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Signature rituals</p>
            <h2>Facilities curated for mindful rejuvenation.</h2>
          </div>
          <Link to="/facilities" className="text-link">
            Discover amenities →
          </Link>
        </div>
        <div className="facility-grid">
          {featuredFacilities.map((facility) => (
            <FacilityCard facility={facility} key={facility.id} />
          ))}
        </div>
      </section>

      <section className="home-gallery" data-animate="fade">
        <div className="gallery-card">
          <p className="eyebrow">Parallax escape</p>
          <h3>Sun-drenched infinity decks suspended over the reef.</h3>
        </div>
        <div className="gallery-card glass">
          <h3>Complimentary transfers</h3>
          <p>Champagne seaplane from Malé International.</p>
        </div>
        <div className="gallery-card dark">
          <h3>Midnight cinema</h3>
          <p>Stargaze screenings on floating loungers.</p>
        </div>
      </section>
    </main>
  )
}

export default Home

