import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      <div className="absolute -inset-[3px] rounded-[46px] bg-gradient-to-b from-white/15 to-white/5 pointer-events-none" />
      <div className="relative rounded-[44px] border-[8px] border-[#1a1c1e] bg-black overflow-hidden shadow-2xl shadow-black/50" style={{ aspectRatio: '280 / 590' }}>
        {/* Punch-hole camera */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-white/10 z-30" />
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
      {/* Side buttons */}
      <div className="absolute -right-[2px] top-24 w-[3px] h-10 bg-[#1a1c1e] rounded-r-sm" />
      <div className="absolute -left-[2px] top-20 w-[3px] h-6 bg-[#1a1c1e] rounded-l-sm" />
      <div className="absolute -left-[2px] top-32 w-[3px] h-10 bg-[#1a1c1e] rounded-l-sm" />
    </div>
  );
}
