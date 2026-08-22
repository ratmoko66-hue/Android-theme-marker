import type { Theme } from '../../types/theme';
import { getWallpaperBackground, getWallpaperFilter, getIconRadius } from '../../utils/wallpaperCss';
import { StatusBarPreview } from './StatusBarPreview';
import { AppIcon } from './AppIcon';
import { DEMO_APPS } from '../../utils/presets';
import { ArrowLeft, Circle, Square } from 'lucide-react';

export function HomeScreenPreview({ theme }: { theme: Theme }) {
  const bg = getWallpaperBackground(theme.wallpaper);
  const filter = getWallpaperFilter(theme.wallpaper);
  const grid = DEMO_APPS.slice(0, 6);
  const dockApps = DEMO_APPS.slice(6, 8);
  const navBg = theme.navigation.transparent ? 'transparent' : theme.navigation.color;

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

        {/* Clock widget */}
        <div className="px-4 pt-2 pb-3 flex flex-col items-center">
          <div className="text-white text-2xl font-semibold" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>9:41</div>
          <div className="text-white/75 text-[10px]">Fri, Aug 21 · 24°C</div>
        </div>

        {/* App grid */}
        <div className="flex-1 px-5 grid grid-cols-3 gap-y-4 content-start">
          {grid.map((app) => (
            <AppIcon key={app.id} emoji={app.emoji} color={app.color} name={app.name} icon={theme.icon} showLabel labelColor="#fff" />
          ))}
          {/* Folder example */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="grid grid-cols-2 gap-0.5 p-2 backdrop-blur-md"
              style={{
                width: (theme.icon.size / 100) * 44 + 20,
                height: (theme.icon.size / 100) * 44 + 20,
                borderRadius: getIconRadius('rounded-square', theme.icon.radius),
                background: 'rgba(255,255,255,0.16)',
              }}
            >
              {DEMO_APPS.slice(2, 6).map((a) => (
                <div key={a.id} className="rounded-[3px] flex items-center justify-center text-[7px]" style={{ background: a.color }}>
                  {a.emoji}
                </div>
              ))}
            </div>
            <span className="text-[9.5px] text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Tools</span>
          </div>
        </div>

        {/* Dock */}
        <div className="mx-4 mb-2 px-3 py-2 rounded-2xl bg-white/12 backdrop-blur-md flex justify-around">
          {dockApps.map((app) => (
            <AppIcon key={app.id} emoji={app.emoji} color={app.color} icon={theme.icon} />
          ))}
        </div>

        {/* Navigation bar */}
        <div className="flex items-center justify-center gap-10 py-2.5" style={{ background: navBg }}>
          {theme.navigation.style === 'gesture' ? (
            <div className="w-24 h-1 rounded-full bg-white/70" />
          ) : (
            <>
              <ArrowLeft size={14} className="text-white/80" />
              <Circle size={12} className="text-white/80" />
              <Square size={12} className="text-white/80" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
