import Link from 'next/link';

export default function CourtCard({ court }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white p-3 shadow-card transition duration-300 hover:-translate-y-1">
      <div className="relative h-60 overflow-hidden rounded-[22px] bg-soft">
        <img
          src={court.image_url || '/images/court-placeholder.jpg'}
          alt={court.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-xs font-black uppercase text-navy">
          {court.status}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black tracking-tight text-navy">{court.name}</h3>
            <p className="mt-1 text-sm font-medium capitalize text-gray-500">{court.type} · {court.location}</p>
          </div>
          <div className="rounded-2xl bg-soft px-3 py-2 text-right text-sm font-black text-navy">
            Rp{Number(court.price_per_hour).toLocaleString('id-ID')}
            <span className="block text-xs font-semibold text-gray-500">/hour</span>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{court.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href={`/courts/${court.id}`} className="rounded-full border border-navy/10 px-4 py-3 text-center text-sm font-extrabold text-navy hover:bg-soft">
            View Detail
          </Link>
          <Link href={`/booking/${court.id}`} className="rounded-full bg-navy px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-lime hover:text-navy">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
