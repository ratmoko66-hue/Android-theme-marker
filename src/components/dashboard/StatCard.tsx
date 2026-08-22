import type { ReactNode } from 'react';

export function StatCard({ icon, label, value, accent }: { icon: ReactNode; label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#12160f]/80 p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}1a`, color: accent }}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-white leading-none">{value}</div>
        <div className="text-[11px] text-white/45 mt-1">{label}</div>
      </div>
    </div>
  );
}
