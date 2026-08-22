import type { Theme } from '../../types/theme';
import { getWallpaperBackground, getWallpaperFilter } from '../../utils/wallpaperCss';
import { ClockDisplay } from './ClockDisplay';
import { StatusBarPreview } from './StatusBarPreview';
import { MessageSquare, Mail, Fingerprint } from 'lucide-react';

export function LockScreenPreview({ theme }: { theme: Theme }) {
  const bg = getWallpaperBackground(theme.wallpaper);
  const filter = getWallpaperFilter(theme.wallpaper);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div
        className="absolute inset-0"
        style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center', filter }}
      />
      {theme.wallpaper.overlay && (
        <div className="absolute inset-0 bg-black" style={{ opacity: theme.wallpaper.overlayOpacity / 100 }} />
      )}
      <div className="relative z-10 flex flex-col h-full">
        <StatusBarPreview theme={theme} />
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6">
          <ClockDisplay clock={theme.clock} />
          <div className="w-full flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2">
              <MessageSquare size={14} className="text-white shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white text-[11px] font-semibold">Messages</div>
                <div className="text-white/70 text-[10px] truncate">Hey, check out the new theme!</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2">
              <Mail size={14} className="text-white shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white text-[11px] font-semibold">Mail</div>
                <div className="text-white/70 text-[10px] truncate">Weekly summary is ready</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-7 flex flex-col items-center gap-2">
          <div className="w-11 h-11 rounded-full bg-white/12 backdrop-blur-md flex items-center justify-center">
            <Fingerprint size={20} className="text-white/90" />
          </div>
          <span className="text-white/60 text-[9px]">Touch sensor to unlock</span>
        </div>
      </div>
    </div>
  );
}
