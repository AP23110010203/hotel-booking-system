

https://github.com/user-attachments/assets/716454dc-9e51-4eb5-89c1-0d4bbad72317

# Blue Horizon Escape Hotel Booking

Premium single-hotel booking experience for Blue Horizon Escape — a boutique Maldives retreat. Built with React, CSS-powered animations, and JSON Server to simulate the backend.

https://github.com/user-attachments/assets/placeholder.mp4

## ✨ Tech Stack
- React + Vite (JSX)
- React Router DOM
- Modern CSS (variables, grid, animations, parallax)
- Vanilla JavaScript + Fetch API
- JSON Server (mock REST API)

## ⭐ Key Features
- Cinematic landing page with parallax hero + scroll reveals
- Rooms listing, filters, and detail views wired to JSON Server
- Animated booking form with validation + POST requests
- Authentication UI: login/register with JSON Server users
- Protected dashboard that reads bookings per user
- Facilities showcase, contact form with map, responsive navigation

## 📁 Folder Structure
```
hotel-booking/
├── public/
│   ├── index.html
│   ├── images/
│   └── videos/
├── src/
│   ├── api/api.js
│   ├── components/
│   │   ├── FacilityCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoomCard.jsx
│   ├── pages/
│   │   ├── Booking.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Facilities.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RoomDetails.jsx
│   │   └── Rooms.jsx
│   ├── assets/styles/
│   │   ├── auth.css
│   │   ├── booking.css
│   │   ├── dashboard.css
│   │   ├── global.css
│   │   ├── home.css
│   │   └── rooms.css
│   ├── App.jsx
│   └── index.jsx
├── db.json
├── package.json
└── README.md
```

## 🗄 JSON Server
`db.json` ships with rooms, facilities, and empty users/bookings collections.

**First, install dependencies (if you haven't already):**
```bash
npm install
```

Start the mock API:
```bash
npm run server
```

Or use npx directly:
```bash
npx json-server --watch db.json --port 5000
```

> **Note:** If you encounter network errors, make sure you're connected to the internet when running `npm install` to download dependencies. Once installed, `npm run server` will work offline.

## 🧭 App Scripts
```bash
npm install
npm run dev
```
Visit http://localhost:5173 after starting both the React dev server and JSON Server.

## 🔌 API Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /rooms | List rooms |
| GET | /rooms/:id | Room details |
| GET | /facilities | Facility cards |
| GET | /bookings?userId=:id | Bookings for a user (dashboard) |
| POST | /bookings | Create booking |
| GET | /users?email=&password= | Login validation |
| POST | /users | Register new user |

## 🖼 Screenshot Placeholders
Provide captures and drop them into a `screenshots/` directory, then reference:
```
![Home](screenshots/home.png)
![Rooms](screenshots/rooms.png)
![Dashboard](screenshots/dashboard.png)
```

## 👤 Author
Designed & engineered by Blue Horizon Escape — 2025. Replace contact info as needed.
