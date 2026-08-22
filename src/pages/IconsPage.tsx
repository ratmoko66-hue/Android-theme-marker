import { useState } from 'react';
import { AppIcon } from '../components/preview/AppIcon';
import { DEMO_APPS } from '../utils/presets';
import type { IconShape, IconStyle } from '../types/theme';
import clsx from 'clsx';

const shapes: IconShape[] = ['circle', 'rounded-square', 'square', 'squircle', 'teardrop', 'hexagon'];
const styles: IconStyle[] = ['flat', 'material', 'minimal', 'glass', 'gradient', 'neon'];

export function IconsPage() {
  const [shape, setShape] = useState<IconShape>('squircle');
  const [style, setStyle] = useState<IconStyle>('material');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Icon Pack</h1>
      <p className="text-white/40 text-sm mb-6">Preview icon shapes and styles. Fine-tune per-theme in the editor.</p>

      <div className="flex flex-wrap gap-6 mb-8">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-2">Shape</div>
          <div className="flex flex-wrap gap-1.5">
            {shapes.map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={clsx('text-[11px] px-2.5 py-1.5 rounded-lg border capitalize transition', shape === s ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25')}
              >
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-2">Style</div>
          <div className="flex flex-wrap gap-1.5">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={clsx('text-[11px] px-2.5 py-1.5 rounded-lg border capitalize transition', style === s ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#12160f]/80 p-6 grid grid-cols-4 sm:grid-cols-8 gap-5 justify-items-center">
        {DEMO_APPS.map((app) => (
          <AppIcon
            key={app.id}
            emoji={app.emoji}
            color={app.color}
            name={app.name}
            showLabel
            labelColor="#fff"
            icon={{ shape, style, size: 80, radius: 24, shadow: true }}
          />
        ))}
      </div>
    </div>
  );
}
