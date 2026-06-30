import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-lime text-navy">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[10px] border-navy text-2xl font-black">R</div>
            <h2 className="text-6xl font-black tracking-[-0.08em] md:text-8xl">RallyCourt</h2>
          </div>
          <p className="mt-6 max-w-md text-sm font-semibold text-navy/70">
            Book Your Court. Start Your Rally. Platform booking lapangan padel yang cepat, rapi, dan mudah digunakan.
          </p>
        </div>

        <div className="grid gap-3 text-sm font-bold">
          <Link href="/">Home</Link>
          <Link href="/courts">Courts</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#pricing">Pricing</Link>
        </div>

        <div className="grid content-start gap-3 text-sm font-bold">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Facebook</span>
        </div>
      </div>
      <div className="bg-navy py-4 text-center text-xs font-semibold text-white/70">© 2026 RallyCourt. All rights reserved.</div>
    </footer>
  );
}
