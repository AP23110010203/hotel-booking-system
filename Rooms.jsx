import { useEffect, useMemo, useState } from 'react'
import RoomCard from '../components/RoomCard'
import { getRooms } from '../api/api'
import { sampleRooms } from '../data/sampleData'

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('price-asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRooms()
      .then((results) => {
        setRooms(results.length ? results : sampleRooms)
        if (!results.length) {
          setError('Live API returned no rooms, showing signature suites instead.')
        }
      })
      .catch(() => {
        setRooms(sampleRooms)
        setError('Unable to reach JSON Server. Showing curated suites.')
      })
      .finally(() => setLoading(false))
  }, [])

  const roomTypes = useMemo(
    () => ['all', ...new Set(rooms.map((room) => room.type))],
    [rooms],
  )

  const displayedRooms = useMemo(() => {
    let filteredRooms =
      filter === 'all' ? rooms : rooms.filter((room) => room.type === filter)

    if (sort === 'price-asc') {
      filteredRooms = [...filteredRooms].sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      filteredRooms = [...filteredRooms].sort((a, b) => b.price - a.price)
    } else if (sort === 'size-desc') {
      filteredRooms = [...filteredRooms].sort((a, b) => b.size - a.size)
    }

    return filteredRooms
  }, [filter, rooms, sort])

  return (
    <main className="rooms-page">
      <section className="page-hero">
        <p className="eyebrow">Suites</p>
        <h1>Choose your horizon.</h1>
        <p>Every suite offers floor-to-ceiling Indian Ocean drama.</p>
      </section>

      <section className="filters" data-animate="fade">
        <label>
          Room type
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All suites' : type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="price-asc">Price · lowest</option>
            <option value="price-desc">Price · highest</option>
            <option value="size-desc">Size · largest</option>
          </select>
        </label>
      </section>

      {loading && <p className="alert">Loading suites...</p>}
      {error && <p className="alert">{error}</p>}

      <section className="room-grid">
        {displayedRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </section>
    </main>
  )
}

export default Rooms

