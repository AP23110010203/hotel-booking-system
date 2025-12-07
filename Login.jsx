import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    loginUser(credentials.email, credentials.password)
      .then((user) => {
        if (!user) {
          setError('Invalid credentials. Please try again.')
          return
        }
        onLogin(user)
        navigate(redirectTo, { replace: true })
      })
      .catch(() => setError('Unable to log in. Please retry.'))
      .finally(() => setLoading(false))
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" data-animate="rise">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to your Blue Horizon Escape dashboard</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="bluehorizonescape@.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>
          {error && <p className="alert">{error}</p>}
          <button className="btn primary w-100" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p>
          No account? <Link to="/register">Register here</Link>
        </p>
      </section>
      <section className="auth-visual" data-animate="float">
        <p className="eyebrow">Insider perks</p>
        <h3>Manage reservations, private transfers, and bespoke itineraries.</h3>
      </section>
    </main>
  )
}

export default Login

