import { Wifi, Signal, BatteryFull } from 'lucide-react';
import type { Theme } from '../../types/theme';

export function StatusBarPreview({ theme }: { theme: Theme }) {
  const bg = theme.statusBar.transparent ? 'transparent' : theme.statusBar.color;
  return (
    <div
      className="flex items-center justify-between px-4 pt-2.5 pb-1.5 text-[11px] font-medium relative z-20"
      style={{ background: bg, color: theme.statusBar.iconColor }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <BatteryFull size={13} />
      </div>
    </div>
  );
}
