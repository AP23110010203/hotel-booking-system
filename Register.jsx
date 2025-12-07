import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getUserByEmail, registerUser } from '../api/api'

const Register = ({ onRegister }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const existing = await getUserByEmail(formData.email)
      if (existing.length) {
        setError('An account with this email already exists.')
        setLoading(false)
        return
      }

      const newUser = await registerUser(formData).then((user) => {
        onRegister(user)
        navigate(redirectTo, { replace: true })
      })
    } catch (err) {
      setError('Unable to register. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" data-animate="fade">
        <p className="eyebrow">Become a member</p>
        <h1>Register for the Aurora experience</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nova Hart"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nova@auroraluxe.com"
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 702 123 4567"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>
          {error && <p className="alert">{error}</p>}
          <button className="btn primary w-100" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
      <section className="auth-visual glass" data-animate="float">
        <p className="eyebrow">Members club</p>
        <h3>
          Save bespoke itineraries, unlock private dining, and chat with your
          butler anywhere.
        </h3>
      </section>
    </main>
  )
}

export default Register

