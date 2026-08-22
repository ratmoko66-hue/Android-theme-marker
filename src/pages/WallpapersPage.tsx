import { useState } from 'react';
import { WALLPAPER_PRESETS } from '../utils/presets';
import clsx from 'clsx';

const categories = Array.from(new Set(WALLPAPER_PRESETS.map((w) => w.category)));

export function WallpapersPage() {
  const [active, setActive] = useState<string>('all');
  const filtered = active === 'all' ? WALLPAPER_PRESETS : WALLPAPER_PRESETS.filter((w) => w.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Wallpapers</h1>
      <p className="text-white/40 text-sm mb-6">Browse built-in wallpapers. Open the editor to apply one to a theme.</p>

      <div className="flex gap-1.5 flex-wrap mb-6">
        <button
          onClick={() => setActive('all')}
          className={clsx('text-xs px-3 py-1.5 rounded-full border transition', active === 'all' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/50 hover:text-white/80')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={clsx('text-xs px-3 py-1.5 rounded-full border transition', active === c ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/50 hover:text-white/80')}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {filtered.map((w) => (
          <div key={w.id} className="rounded-xl overflow-hidden border border-white/[0.07]">
            <div className="aspect-[3/4]" style={{ background: w.css }} />
            <div className="p-2 bg-[#12160f]/80">
              <div className="text-[11px] text-white font-medium truncate">{w.name}</div>
              <div className="text-[10px] text-white/40">{w.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
