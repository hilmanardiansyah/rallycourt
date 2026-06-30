import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../services/api';

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ email: 'admin@rallycourt.test', password: 'admin123' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('rallycourt_user', JSON.stringify(res.data.user));
      if (res.data.user.role === 'admin') router.push('/admin/dashboard');
      else router.push('/courts');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login gagal.');
    }
  };

  return (
    <main className="grid min-h-screen bg-navy p-4 md:grid-cols-[0.55fr_0.45fr]">
      <section className="relative hidden overflow-hidden rounded-[36px] md:block">
        <img src="/images/hero.jpg" alt="Court" className="h-full w-full bg-white/5 object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
          <Link href="/" className="mb-8 inline-flex items-center gap-3 text-xl font-black"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-navy">R</span> RallyCourt</Link>
          <h1 className="max-w-lg text-6xl font-black leading-none tracking-[-0.06em]">Book Your Court. Start Your Rally.</h1>
        </div>
      </section>

      <section className="flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[36px] bg-white p-8 shadow-card md:p-10">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-black text-navy"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime">R</span> RallyCourt</Link>
          <h2 className="mt-10 text-4xl font-black tracking-[-0.05em] text-navy">Admin Login</h2>
          <p className="mt-3 text-sm leading-6 text-gray-500">Gunakan akun admin demo untuk masuk ke dashboard.</p>

          <div className="mt-8 grid gap-4">
            <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input-field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="btn-primary w-full" type="submit">Login</button>
            {message && <p className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{message}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}
