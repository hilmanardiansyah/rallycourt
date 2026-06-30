import { cn } from '../../lib/utils';

const toneClasses = {
  dark: { card: 'bg-navy text-white', icon: 'bg-white/10 text-lime', label: 'text-white/60' },
  accent: { card: 'bg-lime text-navy', icon: 'bg-navy/10 text-navy', label: 'text-navy/60' },
  light: { card: 'border border-gray-100 bg-white text-navy shadow-card', icon: 'bg-soft text-navy', label: 'text-gray-500' }
};

export default function StatCard({ label, value, icon: Icon, tone = 'light' }) {
  const classes = toneClasses[tone] || toneClasses.light;

  return (
    <div className={cn('rounded-[28px] p-6', classes.card)}>
      <div className="flex items-center justify-between">
        <p className={cn('text-sm font-bold', classes.label)}>{label}</p>
        {Icon && (
          <span className={cn('flex h-10 w-10 items-center justify-center rounded-2xl', classes.icon)}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      <p className="mt-4 text-4xl font-black">{value}</p>
    </div>
  );
}
