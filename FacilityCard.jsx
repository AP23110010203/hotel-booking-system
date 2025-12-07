import { useRef } from 'react'
import useRevealOnView from '../hooks/useRevealOnView'

const FacilityCard = ({ facility }) => {
  const cardRef = useRef(null)
  useRevealOnView(cardRef)

  return (
    <article className="facility-card" data-animate="float" ref={cardRef}>
      <div className="facility-icon">{facility.icon}</div>
      <h3>{facility.name}</h3>
      <p>{facility.description}</p>
      <span>{facility.hours}</span>
    </article>
  )
}

export default FacilityCard

