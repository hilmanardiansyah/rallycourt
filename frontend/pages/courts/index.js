import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourtCard from '../../components/CourtCard';
import api from '../../services/api';

export default function CourtsPage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courts')
      .then((res) => setCourts(res.data))
      .catch(() => setCourts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <Navbar />
      <section className="bg-navy px-4 pb-20 pt-36 text-white">
        <div className="container-page">
          <span className="label-pill border-white/10 bg-white/10 text-white"><span className="label-dot bg-lime" /> Courts</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">Find the right court for your next match.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Pilih lapangan yang tersedia, cek detail, lalu lakukan booking sesuai tanggal dan jam bermain.</p>
        </div>
      </section>

      <section className="container-page py-16">
        {loading ? (
          <p className="rounded-[28px] bg-soft p-8 text-center font-semibold text-gray-600">Loading courts...</p>
        ) : courts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {courts.map((court) => <CourtCard key={court.id} court={court} />)}
          </div>
        ) : (
          <p className="rounded-[28px] bg-soft p-8 text-center font-semibold text-gray-600">Data lapangan belum ada atau backend belum berjalan.</p>
        )}
      </section>
      <Footer />
    </main>
  );
}
