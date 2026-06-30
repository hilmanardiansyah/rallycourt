import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-gray-400 focus:border-navy focus:ring-4 focus:ring-navy/10 disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
