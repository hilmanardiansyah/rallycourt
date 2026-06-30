import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '../../lib/utils';

export function Separator({ className, orientation = 'horizontal', ...props }) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={cn('bg-gray-100', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
      {...props}
    />
  );
}
