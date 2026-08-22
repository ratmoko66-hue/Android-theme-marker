import type { FontConfig } from '../../types/theme';
import { FONT_FAMILIES } from '../../utils/presets';
import { SectionLabel } from '../ui/Primitives';
import { SliderField } from '../ui/SliderField';
import clsx from 'clsx';

export function FontCustomizer({
  font,
  onChange,
}: {
  font: FontConfig;
  onChange: (patch: Partial<FontConfig>) => void;
}) {
  const active = FONT_FAMILIES.find((f) => f.id === font.family) ?? FONT_FAMILIES[0];

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
        <p style={{ fontFamily: active.css, fontWeight: font.weight, fontSize: 15 * (font.size / 100) }} className="text-white">
          Android Theme Maker
        </p>
        <p style={{ fontFamily: active.css, fontWeight: font.weight, fontSize: 11 * (font.size / 100) }} className="text-white/50 mt-1">
          The quick brown fox jumps 0123
        </p>
      </div>

      <div>
        <SectionLabel>Font family</SectionLabel>
        <div className="flex flex-col gap-1.5">
          {FONT_FAMILIES.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ family: f.id })}
              style={{ fontFamily: f.css }}
              className={clsx(
                'text-left text-sm px-3 py-2 rounded-lg border transition',
                font.family === f.id ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/70 hover:border-white/25'
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <SliderField label="Font size" value={font.size} min={80} max={130} unit="%" onChange={(v) => onChange({ size: v })} />
        <SliderField label="Font weight" value={font.weight} min={300} max={700} step={100} onChange={(v) => onChange({ weight: v })} />
      </div>
    </div>
  );
}
