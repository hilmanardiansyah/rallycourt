import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import BookingsTable from '../../components/admin/BookingsTable';
import api from '../../services/api';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    api.get('/bookings').then((res) => setBookings(res.data)).catch(() => setBookings([]));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    loadBookings();
  };

  const deleteBooking = async (id) => {
    if (!confirm('Hapus booking ini?')) return;
    await api.delete(`/bookings/${id}`);
    loadBookings();
  };

  return (
    <AdminLayout label="Booking" title="Booking Data" description="Kelola status booking yang masuk dari pemain.">
      <BookingsTable bookings={bookings} onUpdateStatus={updateStatus} onDelete={deleteBooking} />
    </AdminLayout>
  );
}
