import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../services/api';

export default function BookingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [court, setCourt] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    booking_date: '',
    start_time: '08:00',
    end_time: '09:00'
  });

  useEffect(() => {
    if (!id) return;
    api.get(`/courts/${id}`).then((res) => setCourt(res.data)).catch(() => setCourt(null));
  }, [id]);

  const duration = useMemo(() => {
    const [startHour] = form.start_time.split(':').map(Number);
    const [endHour] = form.end_time.split(':').map(Number);
    return Math.max(endHour - startHour, 1);
  }, [form.start_time, form.end_time]);

  const totalPrice = court ? duration * Number(court.price_per_hour) : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/bookings', {
        court_id: Number(id),
        ...form,
        total_price: totalPrice
      });
      setMessage('Booking berhasil dikirim. Tunggu konfirmasi admin.');
      setForm({ customer_name: '', customer_email: '', booking_date: '', start_time: '08:00', end_time: '09:00' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Booking gagal. Cek backend dan database.');
    }
  };

  return (
    <main>
      <Navbar />
      <section className="bg-navy px-4 pb-16 pt-36 text-white">
        <div className="container-page">
          <span className="label-pill border-white/10 bg-white/10 text-white"><span className="label-dot bg-lime" /> Booking</span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.06em] md:text-7xl">Book Your Court</h1>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 md:grid-cols-[0.45fr_0.55fr]">
        <div className="rounded-[36px] bg-soft p-6">
          {court ? (
            <>
              <img src={court.image_url} alt={court.name} className="h-72 w-full rounded-[28px] object-cover" />
              <h2 className="mt-6 text-3xl font-black text-navy">{court.name}</h2>
              <p className="mt-2 font-bold capitalize text-gray-500">{court.type} · {court.location}</p>
              <p className="mt-6 text-3xl font-black text-navy">Rp{Number(court.price_per_hour).toLocaleString('id-ID')}<span className="text-sm text-gray-500"> / hour</span></p>
            </>
          ) : (
            <p>Loading court...</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="rounded-[36px] border border-gray-100 bg-white p-7 shadow-card md:p-10">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">Booking Form</h2>
          <div className="mt-8 grid gap-5">
            <input className="input-field" name="customer_name" placeholder="Nama customer" value={form.customer_name} onChange={handleChange} required />
            <input className="input-field" name="customer_email" type="email" placeholder="Email customer" value={form.customer_email} onChange={handleChange} required />
            <input className="input-field" name="booking_date" type="date" value={form.booking_date} onChange={handleChange} required />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-gray-600">Jam mulai<input className="input-field" name="start_time" type="time" value={form.start_time} onChange={handleChange} required /></label>
              <label className="grid gap-2 text-sm font-bold text-gray-600">Jam selesai<input className="input-field" name="end_time" type="time" value={form.end_time} onChange={handleChange} required /></label>
            </div>
            <div className="rounded-[24px] bg-soft p-5">
              <p className="text-sm font-bold text-gray-500">Total Price</p>
              <p className="mt-1 text-3xl font-black text-navy">Rp{totalPrice.toLocaleString('id-ID')}</p>
            </div>
            <button className="btn-primary w-full" type="submit">Submit Booking</button>
            {message && <p className="rounded-2xl bg-lime/30 p-4 text-sm font-bold text-navy">{message}</p>}
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}
