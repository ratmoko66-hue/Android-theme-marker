import type { IconConfig, IconShape, IconStyle } from '../../types/theme';
import { DEMO_APPS } from '../../utils/presets';
import { SectionLabel } from '../ui/Primitives';
import { SliderField } from '../ui/SliderField';
import { AppIcon } from '../preview/AppIcon';
import clsx from 'clsx';

const shapes: { id: IconShape; label: string }[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'rounded-square', label: 'Rounded' },
  { id: 'square', label: 'Square' },
  { id: 'squircle', label: 'Squircle' },
  { id: 'teardrop', label: 'Teardrop' },
  { id: 'hexagon', label: 'Hexagon' },
];

const styles: { id: IconStyle; label: string }[] = [
  { id: 'flat', label: 'Flat' },
  { id: 'material', label: 'Material' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'glass', label: 'Glass' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'neon', label: 'Neon' },
];

export function IconCustomizer({
  icon,
  onChange,
}: {
  icon: IconConfig;
  onChange: (patch: Partial<IconConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex justify-center gap-3 flex-wrap">
        {DEMO_APPS.slice(0, 4).map((app) => (
          <AppIcon key={app.id} emoji={app.emoji} color={app.color} icon={icon} />
        ))}
      </div>

      <div>
        <SectionLabel>Icon shape</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {shapes.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange({ shape: s.id })}
              className={clsx(
                'text-[11px] py-2 rounded-lg border transition',
                icon.shape === s.id ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Icon style</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange({ style: s.id })}
              className={clsx(
                'text-[11px] py-2 rounded-lg border transition',
                icon.style === s.id ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <SliderField label="Size" value={icon.size} min={40} max={100} onChange={(v) => onChange({ size: v })} />
        {icon.shape === 'squircle' && (
          <SliderField label="Corner radius" value={icon.radius} min={0} max={50} unit="%" onChange={(v) => onChange({ radius: v })} />
        )}
        <label className="flex items-center justify-between text-xs text-white/60">
          Drop shadow
          <input type="checkbox" checked={icon.shadow} onChange={(e) => onChange({ shadow: e.target.checked })} className="accent-emerald-500" />
        </label>
      </div>
    </div>
  );
}
