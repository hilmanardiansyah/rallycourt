import { useState } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const statusVariant = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger'
};

const filters = ['all', 'pending', 'confirmed', 'cancelled'];

export default function BookingsTable({ bookings, onUpdateStatus, onDelete }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? bookings : bookings.filter((booking) => booking.status === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={filter === item ? 'default' : 'outline'}
            onClick={() => setFilter(item)}
            className="capitalize"
          >
            {item}
          </Button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Court</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-gray-500">Belum ada data booking.</TableCell>
            </TableRow>
          ) : (
            filtered.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <p className="font-bold text-navy">{booking.customer_name}</p>
                  <p className="text-xs text-gray-500">{booking.customer_email}</p>
                </TableCell>
                <TableCell className="text-gray-600">{booking.court_name}</TableCell>
                <TableCell className="text-gray-600">{new Date(booking.booking_date).toLocaleDateString('id-ID')}</TableCell>
                <TableCell className="text-gray-600">{booking.start_time} - {booking.end_time}</TableCell>
                <TableCell className="font-semibold text-navy">Rp{Number(booking.total_price).toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[booking.status] || 'default'}>{booking.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="outline" onClick={() => onUpdateStatus(booking.id, 'confirmed')} title="Confirm">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => onUpdateStatus(booking.id, 'cancelled')} title="Cancel">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => onDelete(booking.id)} title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
