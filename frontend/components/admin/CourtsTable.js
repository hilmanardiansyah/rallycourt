import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Search } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const FALLBACK_THUMB = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=200&q=60';

export default function CourtsTable({ courts, onDelete }) {
  const [query, setQuery] = useState('');
  const filtered = courts.filter((court) =>
    `${court.name} ${court.location}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4 max-w-xs">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Cari lapangan..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Court</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-gray-500">Belum ada data lapangan.</TableCell>
            </TableRow>
          ) : (
            filtered.map((court) => (
              <TableRow key={court.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={court.image_url || FALLBACK_THUMB} alt={court.name} className="h-11 w-11 rounded-xl object-cover" />
                    <span className="font-bold text-navy">{court.name}</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize text-gray-600">{court.type}</TableCell>
                <TableCell className="text-gray-600">{court.location}</TableCell>
                <TableCell className="font-semibold text-navy">Rp{Number(court.price_per_hour).toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <Badge variant={court.status === 'available' ? 'success' : 'warning'}>{court.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="outline">
                      <Link href={`/admin/courts/${court.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => onDelete(court.id)}>
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
