import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundVideo from './components/BackgroundVideo'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Facilities from './pages/Facilities'
import Contact from './pages/Contact'
import ViewSuite from './pages/ViewSuite'
import TestCRUD from './pages/TestCRUD'

const App = () => {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('aurora_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => el.classList.remove('visible'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  const handleLogin = (profile) => {
    localStorage.setItem('aurora_user', JSON.stringify(profile))
    setUser(profile)
  }

  const handleLogout = () => {
    localStorage.removeItem('aurora_user')
    setUser(null)
  }

  return (
    <div className="app-shell">
      <BackgroundVideo />
      <Navbar user={user} onLogout={handleLogout} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/suite/:id" element={<ViewSuite />} />
          <Route path="/booking" element={<Booking user={user} />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} />}
          />
          <Route 
            path="/test-crud" 
            element={
              <ProtectedRoute user={user}>
                <TestCRUD />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
