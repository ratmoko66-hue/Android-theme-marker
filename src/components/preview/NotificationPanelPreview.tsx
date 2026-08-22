import type { Theme } from '../../types/theme';
import { Wifi, Bluetooth, Signal, Sun, Bell } from 'lucide-react';

const quickToggles = [
  { icon: Wifi, label: 'Wi-Fi', active: true },
  { icon: Bluetooth, label: 'Bluetooth', active: true },
  { icon: Signal, label: 'Data', active: false },
];

export function NotificationPanelPreview({ theme }: { theme: Theme }) {
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: theme.colors.background }}>
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between text-[11px] text-white/80 mb-4">
          <span>9:41</span>
          <span>Fri, Aug 21</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {quickToggles.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-2xl py-3"
              style={{ background: active ? theme.colors.primary : 'rgba(255,255,255,0.06)' }}
            >
              <Icon size={16} color={active ? theme.colors.background : '#fff'} />
              <span className="text-[9px]" style={{ color: active ? theme.colors.background : '#fff' }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-1 mb-4">
          <Sun size={13} className="text-white/60" />
          <div className="flex-1 h-1 rounded-full bg-white/15 relative">
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '65%', background: theme.colors.primary }} />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Bell size={12} className="text-white/50" />
          <span className="text-[10px] text-white/50 uppercase tracking-wide">Notifications</span>
        </div>
        <div className="flex flex-col gap-2">
          {['WhatsApp · New message', 'Camera · Photo saved', 'System · Theme applied'].map((n) => (
            <div key={n} className="rounded-xl px-3 py-2.5 text-[10.5px] text-white/85" style={{ background: theme.colors.card }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
