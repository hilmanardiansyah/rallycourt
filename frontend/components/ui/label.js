import { cn } from '../../lib/utils';

export function Label({ className, ...props }) {
  return <label className={cn('mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500', className)} {...props} />;
}
