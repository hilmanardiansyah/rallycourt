import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourtCard from "../components/CourtCard";
import Reveal from "../components/Reveal";
import api from "../services/api";

const services = [
  {
    title: "Court Booking",
    text: "Pilih lapangan, tanggal, dan jam bermain hanya dalam beberapa langkah.",
    image: "/images/service-booking.jpg",
  },
  {
    title: "Private Session",
    text: "Sesi latihan privat dengan pelatih untuk pemain baru maupun intermediate.",
    image: "/images/service-private.jpg",
  },
  {
    title: "Community Match",
    text: "Gabung komunitas padel dan ikuti jadwal friendly match setiap minggu.",
    image: "/images/service-community.jpg",
  },
];

const highlights = [
  "Booking online 24 jam",
  "Lapangan indoor & outdoor",
  "Konfirmasi instan",
  "Harga transparan, tanpa biaya tersembunyi",
];

const faqs = [
  [
    "How do I book a court?",
    "Pilih lapangan, isi tanggal dan jam, lalu submit booking.",
  ],
  [
    "Can I cancel my booking?",
    "Hubungi pengelola untuk mengubah atau membatalkan booking kamu.",
  ],
  [
    "Do I need an account?",
    "Tidak, kamu bisa langsung booking tanpa perlu membuat akun.",
  ],
  [
    "How much is the court rental?",
    "Harga bervariasi tergantung lapangan, mulai dari Rp120.000/jam.",
  ],
];

export default function Home() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    api
      .get("/courts")
      .then((res) => setCourts(res.data.slice(0, 3)))
      .catch(() => setCourts([]));
  }, []);

  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-navy text-white">
        <img
          src="/images/hero.jpg"
          alt="Padel court"
          className="absolute inset-0 h-full w-full object-cover opacity-58"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/45 via-navy/30 to-navy/90" />

        <div className="container-page relative z-10 flex min-h-screen items-end pb-16 pt-32 md:pb-24">
          <div className="grid w-full items-end gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-5 inline-flex animate-fade-in-up rounded-full bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur-md">
                New padel booking platform
              </div>
              <h1 className="max-w-3xl animate-fade-in-up text-5xl font-black leading-[0.95] tracking-[-0.06em] [animation-delay:120ms] md:text-8xl">
                Book Your Padel Court and Play Your Best Rally.
              </h1>
            </div>

            <div className="max-w-md animate-fade-in-up [animation-delay:240ms] md:justify-self-end">
              <p className="text-lg leading-8 text-white/78">
                Find available padel courts, choose your schedule, and reserve
                your game in minutes.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/courts" className="btn-primary">
                  Book Now
                </Link>
                <Link href="#about" className="btn-outline">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container-page py-24">
        <div className="grid items-start gap-10 md:grid-cols-[0.38fr_0.62fr]">
          <Reveal>
            <span className="label-pill">
              <span className="label-dot" /> About RallyCourt
            </span>
            <div className="mt-10 inline-block animate-floaty rounded-[28px] bg-lime px-7 py-5 text-5xl font-black tracking-tight text-navy md:text-7xl">
              2026
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-navy md:text-5xl">
              RallyCourt membantu pemain menemukan lapangan, mengecek detail,
              dan melakukan reservasi secara cepat.
            </h2>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <img
                src="/images/about-1.jpg"
                alt="Player"
                className="h-80 w-full rounded-[32px] bg-soft object-cover"
              />
              <div className="flex flex-col justify-between rounded-[32px] bg-soft p-7">
                <img
                  src="/images/about-2.jpg"
                  alt="Players"
                  className="h-44 w-full rounded-[24px] bg-white object-cover"
                />
                <ul className="mt-6 grid gap-2 text-sm font-semibold text-navy">
                  {highlights.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-xs font-black">
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="bg-lime py-24 text-navy">
        <div className="container-page">
          <Reveal>
            <span className="label-pill border-navy/20 bg-lime">
              <span className="label-dot" /> Services
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Our Services & Activities
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <article className="h-full rounded-[32px] bg-white p-4 shadow-card transition-transform duration-300 hover:-translate-y-2">
                  <div className="p-3">
                    <h3 className="text-xl font-black">{item.title}</h3>
                    <p className="mt-2 min-h-14 text-sm leading-6 text-gray-600">
                      {item.text}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full rounded-[24px] bg-soft object-cover"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-center gap-10 py-24 md:grid-cols-2">
        <Reveal>
          <span className="label-pill">
            <span className="label-dot" /> How It Works
          </span>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] text-navy md:text-6xl">
            How to Book Your Court
          </h2>
          <div className="mt-10 grid gap-6">
            {[
              "Choose your court.",
              "Select date and time.",
              "Submit booking.",
              "Wait for confirmation.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-5 border-b border-gray-100 pb-5"
              >
                <span className="text-sm font-black text-gray-400">
                  0{index + 1}
                </span>
                <p className="text-lg font-bold text-navy">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <img
            src="/images/court-1.jpg"
            alt="Padel players"
            className="h-[520px] w-full rounded-[36px] bg-soft object-cover"
          />
        </Reveal>
      </section>

      <section className="bg-navy py-10 text-white md:py-16">
        <div className="container-page grid items-center gap-8 rounded-[34px] bg-white/4 p-4 md:grid-cols-[0.45fr_0.55fr] md:p-6">
          <Reveal>
            <img
              src="/images/coach-1.jpg"
              alt="Coach"
              className="h-80 w-full rounded-[28px] bg-white/10 object-cover md:h-[430px]"
            />
          </Reveal>
          <Reveal delay={120} className="p-4 md:p-10">
            <span className="label-pill border-white/10 bg-white/10 text-white">
              <span className="label-dot bg-lime" /> Our Coach
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Meet Our Coaches
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/65">
              Tingkatkan permainanmu bersama pelatih berpengalaman, baik untuk
              sesi privat maupun kelompok.
            </p>
            <Link href="/courts" className="btn-primary mt-7">
              Start Booking
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="pricing" className="container-page py-24 text-center">
        <Reveal>
          <span className="label-pill">
            <span className="label-dot" /> Pricing
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-navy md:text-6xl">
            Choose Your Plan
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[30px] border border-gray-100 bg-white p-7 text-left shadow-card transition-transform duration-300 hover:-translate-y-2">
              <span className="rounded-full bg-soft px-3 py-1 text-xs font-black text-navy">
                Standard
              </span>
              <p className="mt-5 text-4xl font-black text-navy">
                $25
                <span className="text-base font-bold text-gray-500">
                  /month
                </span>
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-gray-600">
                <li>✓ Community court access</li>
                <li>✓ Online reservation</li>
                <li>✓ Booking history</li>
              </ul>
              <Link href="/courts" className="btn-dark mt-7 w-full">
                Join Standard
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-[30px] border border-gray-100 bg-white p-7 text-left shadow-card transition-transform duration-300 hover:-translate-y-2">
              <span className="rounded-full bg-lime px-3 py-1 text-xs font-black text-navy">
                Most popular
              </span>
              <p className="mt-5 text-4xl font-black text-navy">
                $55
                <span className="text-base font-bold text-gray-500">
                  /month
                </span>
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-gray-600">
                <li>✓ Priority court booking</li>
                <li>✓ Private session access</li>
                <li>✓ Match scheduling</li>
              </ul>
              <Link href="/courts" className="btn-dark mt-7 w-full">
                Join Premium
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-12">
        <Reveal className="mb-10 flex items-end justify-between gap-5">
          <div>
            <span className="label-pill">
              <span className="label-dot" /> Courts
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-navy md:text-6xl">
              Available Courts
            </h2>
          </div>
          <Link
            href="/courts"
            className="hidden rounded-full bg-lime px-5 py-3 text-sm font-black text-navy md:inline-flex"
          >
            See All Courts
          </Link>
        </Reveal>
        {courts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {courts.map((court, index) => (
              <Reveal key={court.id} delay={index * 100}>
                <CourtCard court={court} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] bg-soft p-8 text-center text-gray-600">
            Jalankan backend dulu agar data lapangan dari database tampil di
            sini.
          </div>
        )}
      </section>

      <section className="bg-soft py-24">
        <div className="container-page grid gap-10 md:grid-cols-[0.45fr_0.55fr]">
          <Reveal>
            <span className="label-pill">
              <span className="label-dot" /> FAQ
            </span>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] text-navy md:text-6xl">
              Frequently Asked Question
            </h2>
          </Reveal>
          <Reveal delay={120} className="grid gap-3">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-2xl bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <summary className="cursor-pointer list-none text-base font-black text-navy">
                  {q}
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-600">{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <img
          src="/images/hero.jpg"
          alt="Court"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-navy/45" />
        <Reveal className="container-page relative z-10">
          <h2 className="max-w-xl text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
            Ready to play with us?
          </h2>
          <p className="mt-5 max-w-md text-white/70">
            Check available padel courts and submit your reservation now.
          </p>
          <Link href="/courts" className="btn-primary mt-8">
            Join the Game
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
