import { useState, useEffect } from 'react';
import { 
  createBooking, 
  getAllBookings, 
  getBookingById, 
  updateBooking, 
  deleteBooking 
} from '../api/api';

const TestCRUD = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    userId: 1,
    roomId: 1,
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(Array.isArray(data) ? data : []);
      setMessage('Bookings fetched successfully!');
    } catch (error) {
      setMessage(`Error fetching bookings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({
      ...prev,
      [name]: name === 'totalPrice' ? parseFloat(value) : value
    }));
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const created = await createBooking(newBooking);
      setBookings(prev => [...prev, created]);
      setMessage('Booking created successfully!');
      // Reset form
      setNewBooking({
        userId: 1,
        roomId: 1,
        checkInDate: '',
        checkOutDate: '',
        totalPrice: 0
      });
    } catch (error) {
      setMessage(`Error creating booking: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBooking = async (id) => {
    try {
      setLoading(true);
      const updated = await updateBooking(id, { ...selectedBooking });
      setBookings(prev => 
        prev.map(booking => booking.id === id ? updated : booking)
      );
      setMessage('Booking updated successfully!');
      setSelectedBooking(null);
    } catch (error) {
      setMessage(`Error updating booking: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      setLoading(true);
      await deleteBooking(id);
      setBookings(prev => prev.filter(booking => booking.id !== id));
      setMessage('Booking deleted successfully!');
    } catch (error) {
      setMessage(`Error deleting booking: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test CRUD Operations</h1>
      
      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create/Edit Form */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {selectedBooking ? 'Edit Booking' : 'Create New Booking'}
          </h2>
          
          <form onSubmit={selectedBooking ? 
            (e) => { e.preventDefault(); handleUpdateBooking(selectedBooking.id); } : 
            handleCreateBooking}>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">User ID</label>
              <input
                type="number"
                name="userId"
                value={selectedBooking?.userId || newBooking.userId}
                onChange={(e) => selectedBooking ? 
                  setSelectedBooking({...selectedBooking, userId: parseInt(e.target.value)}) : 
                  handleInputChange(e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Room ID</label>
              <input
                type="number"
                name="roomId"
                value={selectedBooking?.roomId || newBooking.roomId}
                onChange={(e) => selectedBooking ? 
                  setSelectedBooking({...selectedBooking, roomId: parseInt(e.target.value)}) : 
                  handleInputChange(e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={selectedBooking?.checkInDate || newBooking.checkInDate}
                onChange={(e) => selectedBooking ? 
                  setSelectedBooking({...selectedBooking, checkInDate: e.target.value}) : 
                  handleInputChange(e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={selectedBooking?.checkOutDate || newBooking.checkOutDate}
                onChange={(e) => selectedBooking ? 
                  setSelectedBooking({...selectedBooking, checkOutDate: e.target.value}) : 
                  handleInputChange(e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Total Price</label>
              <input
                type="number"
                name="totalPrice"
                value={selectedBooking?.totalPrice || newBooking.totalPrice}
                onChange={(e) => selectedBooking ? 
                  setSelectedBooking({...selectedBooking, totalPrice: parseFloat(e.target.value)}) : 
                  handleInputChange(e)}
                className="w-full p-2 border rounded"
                step="0.01"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Processing...' : (selectedBooking ? 'Update' : 'Create')}
              </button>
              
              {selectedBooking && (
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Bookings List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Bookings List</h2>
          
          {loading && !bookings.length ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p><strong>ID:</strong> {booking.id}</p>
                      <p><strong>User ID:</strong> {booking.userId}</p>
                      <p><strong>Room ID:</strong> {booking.roomId}</p>
                      <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                      <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(booking)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCRUD;
