import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Building2, CalendarCheck, ArrowLeft, LogOut, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courts', label: 'Manage Courts', icon: Building2 },
  { href: '/admin/bookings', label: 'Booking Data', icon: CalendarCheck }
];

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('rallycourt_user');
    router.push('/login');
  };

  return (
    <aside className="flex flex-col gap-6 bg-navy p-5 text-white md:fixed md:inset-y-0 md:left-0 md:z-40 md:h-screen md:w-[280px] md:p-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-lg font-black text-navy">R</span>
        <span className="text-xl font-black">RallyCourt</span>
      </Link>

      <nav className="flex gap-2 overflow-x-auto pb-1 md:mt-4 md:flex-col md:gap-1.5 md:overflow-visible md:pb-0">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = router.pathname === href || router.pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-colors',
                active ? 'bg-lime text-navy' : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:mt-auto md:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-white/10">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold">Admin</p>
              <p className="truncate text-xs text-white/50">admin@rallycourt.test</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-white/40" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Website
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
