import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-navy outline-none transition placeholder:text-gray-400 focus:border-navy focus:ring-4 focus:ring-navy/10 disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
