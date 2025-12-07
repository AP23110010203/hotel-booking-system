import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './assets/styles/global.css'
import './assets/styles/home.css'
import './assets/styles/rooms.css'
import './assets/styles/booking.css'
import './assets/styles/auth.css'
import './assets/styles/dashboard.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
