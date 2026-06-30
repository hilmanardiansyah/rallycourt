import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/admin/AdminLayout';
import CourtForm from '../../../../components/admin/CourtForm';
import api from '../../../../services/api';

export default function AdminEditCourtPage() {
  const router = useRouter();
  const { id } = router.query;
  const [court, setCourt] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/courts/${id}`).then((res) => setCourt(res.data)).catch(() => setCourt(null));
  }, [id]);

  const handleUpdate = async (payload) => {
    await api.put(`/courts/${id}`, payload);
    router.push('/admin/courts');
  };

  return (
    <AdminLayout label="CRUD" title="Edit Court" description="Perbarui detail lapangan.">
      {court ? (
        <CourtForm initialValues={court} onSubmit={handleUpdate} submitLabel="Update Court" />
      ) : (
        <p className="text-sm font-semibold text-gray-500">Memuat data lapangan...</p>
      )}
    </AdminLayout>
  );
}
