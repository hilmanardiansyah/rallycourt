import { cn } from '../../lib/utils';

export function Table({ className, ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] border border-gray-100">
      <table className={cn('w-full min-w-[720px] border-collapse text-sm', className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn('bg-soft', className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn('divide-y divide-gray-100', className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn('transition-colors hover:bg-soft/60', className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return <th className={cn('px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500', className)} {...props} />;
}

export function TableCell({ className, ...props }) {
  return <td className={cn('px-5 py-4 align-middle', className)} {...props} />;
}
