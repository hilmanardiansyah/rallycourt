import Link from 'next/link';

export default function Navbar({ dark = false }) {
  return (
    <header className="fixed left-0 right-0 top-4 z-50">
      <div className="container-page">
        <nav className="flex items-center justify-between rounded-full border border-white/20 bg-navy/88 px-4 py-3 shadow-2xl backdrop-blur-md md:px-6">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-xl font-black text-navy">R</span>
            <span className="text-lg font-black tracking-tight">RallyCourt</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-white/78 md:flex">
            <Link href="/" className="hover:text-lime">Home</Link>
            <Link href="/courts" className="hover:text-lime">Courts</Link>
            <Link href="/#services" className="hover:text-lime">Services</Link>
            <Link href="/#pricing" className="hover:text-lime">Pricing</Link>
            <Link href="/login" className="hover:text-lime">Login</Link>
          </div>

          <Link href="/courts" className="rounded-full bg-white px-5 py-2 text-sm font-extrabold text-navy transition hover:bg-lime">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
