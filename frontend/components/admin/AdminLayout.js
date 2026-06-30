import AdminSidebar from '../AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ label, title, description, actions, children }) {
  return (
    <div className="min-h-screen bg-soft">
      <AdminSidebar />
      <div className="md:pl-[280px]">
        <AdminTopbar label={label} title={title} description={description} actions={actions} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
