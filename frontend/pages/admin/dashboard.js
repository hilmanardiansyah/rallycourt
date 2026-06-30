import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, CalendarCheck, Clock, Plus, ArrowRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import api from '../../services/api';

const statusVariant = { pending: 'warning', confirmed: 'success', cancelled: 'danger' };

export default function AdminDashboardPage() {
  const [courts, setCourts] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/courts').then((res) => setCourts(res.data)).catch(() => setCourts([]));
    api.get('/bookings').then((res) => setBookings(res.data)).catch(() => setBookings([]));
  }, []);

  const recentBookings = bookings.slice(0, 5);

  return (
    <AdminLayout label="Admin" title="Dashboard" description="Ringkasan data lapangan dan booking RallyCourt.">
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Total Courts" value={courts.length} icon={Building2} tone="dark" />
        <StatCard label="Total Bookings" value={bookings.length} icon={CalendarCheck} tone="accent" />
        <StatCard label="Pending" value={bookings.filter((b) => b.status === 'pending').length} icon={Clock} tone="light" />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.6fr_0.4fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link href="/admin/bookings" className="flex items-center gap-1 text-xs font-bold text-navy hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="grid gap-3">
            {recentBookings.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada data booking.</p>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between gap-3 rounded-2xl bg-soft p-4">
                  <div>
                    <p className="text-sm font-bold text-navy">{booking.customer_name}</p>
                    <p className="text-xs text-gray-500">{booking.court_name} · {new Date(booking.booking_date).toLocaleDateString('id-ID')}</p>
                  </div>
                  <Badge variant={statusVariant[booking.status] || 'default'}>{booking.status}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="primary">
              <Link href="/admin/courts/create"><Plus className="h-4 w-4" /> Add New Court</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/courts">Manage Courts</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/bookings">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
