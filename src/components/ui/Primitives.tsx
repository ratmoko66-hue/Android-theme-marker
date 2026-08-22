import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/[0.07] bg-[#12160f]/80 backdrop-blur-sm',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{children}</h3>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
      <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-white/40 mb-4">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-1.5">{title}</h3>
      <p className="text-white/45 text-sm max-w-xs mb-5">{description}</p>
      {action}
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#151a17] p-5 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-3.5">
          <AlertTriangle size={19} />
        </div>
        <h3 className="text-white font-semibold mb-1.5">{title}</h3>
        <p className="text-white/50 text-sm mb-5">{description}</p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="md" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" size="md" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}

export function Loading({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/40 text-sm gap-3">
      <div className="w-6 h-6 border-2 border-white/15 border-t-emerald-400 rounded-full animate-spin" />
      {label}
    </div>
  );
}
