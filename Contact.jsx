import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Thank you. Our concierge will respond within 2 hours.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="contact-page">
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Any special requests? We orchestrate magic.</h1>
        <p>Concierge available 24/7 via phone, WhatsApp, or email.</p>
      </section>
      <section className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit} data-animate="rise">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Aiden Lux"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="aiden@luxe.com"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your dream itinerary..."
            />
          </label>
          {status && <p className="success">{status}</p>}
          <button className="btn primary" type="submit">
            Send request
          </button>
        </form>
        <div className="contact-map" data-animate="float">
          <iframe
            title="Blue Horizon Escape"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15557.28534203769!2d80.274137!3d13.0500314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5268f36d3f3cf1%3A0x9d6a8d2e9e0a9a75!2sMarina%20Beach!5e0!3m2!1sen!2sin!4v1707045300000!5m2!1sen!2sin
"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact-details">
            <p>marine beach · chennai · india</p>
            <p>+91 6789012345 · concierge@bluehorizonescape.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact

