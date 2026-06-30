import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import CourtsTable from '../../../components/admin/CourtsTable';
import { Button } from '../../../components/ui/button';
import api from '../../../services/api';

export default function AdminCourtsPage() {
  const [courts, setCourts] = useState([]);

  const loadCourts = () => {
    api.get('/courts').then((res) => setCourts(res.data)).catch(() => setCourts([]));
  };

  useEffect(() => {
    loadCourts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Hapus data lapangan ini?')) return;
    await api.delete(`/courts/${id}`);
    loadCourts();
  };

  return (
    <AdminLayout
      label="CRUD"
      title="Manage Courts"
      description="Kelola data lapangan yang tampil di halaman booking."
      actions={
        <Button asChild variant="primary">
          <Link href="/admin/courts/create"><Plus className="h-4 w-4" /> Add New Court</Link>
        </Button>
      }
    >
      <CourtsTable courts={courts} onDelete={handleDelete} />
    </AdminLayout>
  );
}
