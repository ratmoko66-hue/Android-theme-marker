import { useState } from 'react';
import type { Theme } from '../../types/theme';
import { PhoneFrame } from './PhoneFrame';
import { LockScreenPreview } from './LockScreenPreview';
import { HomeScreenPreview } from './HomeScreenPreview';
import { NotificationPanelPreview } from './NotificationPanelPreview';
import clsx from 'clsx';

type Screen = 'lock' | 'home' | 'notifications';

const screens: { id: Screen; label: string }[] = [
  { id: 'lock', label: 'Lock Screen' },
  { id: 'home', label: 'Home Screen' },
  { id: 'notifications', label: 'Notifications' },
];

export function AndroidPreview({ theme }: { theme: Theme }) {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6">
        {screens.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={clsx(
              'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
              screen === s.id ? 'bg-emerald-500 text-emerald-950' : 'text-white/50 hover:text-white/80'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-2">
        <PhoneFrame>
          {screen === 'lock' && <LockScreenPreview theme={theme} />}
          {screen === 'home' && <HomeScreenPreview theme={theme} />}
          {screen === 'notifications' && <NotificationPanelPreview theme={theme} />}
        </PhoneFrame>
      </div>
      <p className="text-white/30 text-[11px] mt-4">Live preview · updates instantly as you edit</p>
    </div>
  );
}
