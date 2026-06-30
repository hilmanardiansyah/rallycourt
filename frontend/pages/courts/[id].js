import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../services/api';

export default function CourtDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [court, setCourt] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/courts/${id}`)
      .then((res) => setCourt(res.data))
      .catch(() => setCourt(null));
  }, [id]);

  return (
    <main>
      <Navbar />
      <section className="bg-navy px-4 pb-16 pt-36 text-white">
        <div className="container-page">
          <span className="label-pill border-white/10 bg-white/10 text-white"><span className="label-dot bg-lime" /> Court Detail</span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.06em] md:text-7xl">Court Detail</h1>
        </div>
      </section>

      <section className="container-page py-16">
        {!court ? (
          <p className="rounded-[28px] bg-soft p-8 text-center font-semibold text-gray-600">Loading detail lapangan...</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-[0.55fr_0.45fr]">
            <img src={court.image_url} alt={court.name} className="h-[540px] w-full rounded-[36px] object-cover shadow-card" />
            <div className="rounded-[36px] bg-soft p-8 md:p-10">
              <span className="rounded-full bg-lime px-4 py-2 text-xs font-black uppercase text-navy">{court.status}</span>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-navy md:text-6xl">{court.name}</h2>
              <p className="mt-4 text-lg font-bold capitalize text-gray-500">{court.type} · {court.location}</p>
              <p className="mt-8 text-4xl font-black text-navy">Rp{Number(court.price_per_hour).toLocaleString('id-ID')}<span className="text-base font-bold text-gray-500"> / hour</span></p>
              <p className="mt-8 leading-8 text-gray-600">{court.description}</p>
              <Link href={`/booking/${court.id}`} className="btn-primary mt-10 w-full md:w-auto">Book This Court</Link>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
