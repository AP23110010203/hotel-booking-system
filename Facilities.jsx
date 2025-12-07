import { useEffect, useState } from 'react'
import FacilityCard from '../components/FacilityCard'
import { getFacilities } from '../api/api'
import { sampleFacilities } from '../data/sampleData'

const Facilities = () => {
  const [facilities, setFacilities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getFacilities()
      .then((data) => {
        setFacilities(data.length ? data : sampleFacilities)
        if (!data.length) {
          setError('Live facilities unavailable. Showing curated amenities.')
        }
      })
      .catch(() => {
        setFacilities(sampleFacilities)
        setError('Unable to load facilities. Showing curated amenities.')
      })
  }, [])

  return (
    <main className="facilities-page">
      <section className="page-hero">
        <p className="eyebrow">Facilities</p>
        <h1>Bespoke spaces curated for renewal.</h1>
        <p>From glass-bottom spas to midnight speakeasies.</p>
      </section>
      {error && <p className="alert">{error}</p>}
      <section className="facility-grid">
        {facilities.map((facility) => (
          <FacilityCard facility={facility} key={facility.id} />
        ))}
      </section>
    </main>
  )
}

export default Facilities

