import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import CourtForm from '../../../components/admin/CourtForm';
import api from '../../../services/api';

export default function AdminCreateCourtPage() {
  const router = useRouter();

  const handleCreate = async (payload) => {
    await api.post('/courts', payload);
    router.push('/admin/courts');
  };

  return (
    <AdminLayout label="CRUD" title="Add New Court" description="Lengkapi detail lapangan baru di bawah ini.">
      <CourtForm onSubmit={handleCreate} submitLabel="Add Court" />
    </AdminLayout>
  );
}
