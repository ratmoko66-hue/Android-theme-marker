import type { ClockConfig } from '../../types/theme';
import { SectionLabel } from '../ui/Primitives';
import { SliderField } from '../ui/SliderField';
import { ColorField } from '../ui/ColorField';
import { ClockDisplay } from '../preview/ClockDisplay';
import clsx from 'clsx';

const designs: { id: ClockConfig['design']; label: string }[] = [
  { id: 'digital', label: 'Digital' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'neon', label: 'Neon' },
  { id: 'large', label: 'Large Clock' },
  { id: 'material-you', label: 'Material You' },
];

const alignments: { id: ClockConfig['alignment']; label: string }[] = [
  { id: 'left', label: 'Left' },
  { id: 'center', label: 'Center' },
  { id: 'right', label: 'Right' },
];

export function ClockDesigner({
  clock,
  onChange,
}: {
  clock: ClockConfig;
  onChange: (patch: Partial<ClockConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-[#0d0f0c] border border-white/[0.06] p-5 flex justify-center">
        <ClockDisplay clock={clock} />
      </div>

      <div>
        <SectionLabel>Clock design</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {designs.map((d) => (
            <button
              key={d.id}
              onClick={() => onChange({ design: d.id })}
              className={clsx(
                'text-[11px] py-2 rounded-lg border transition',
                clock.design === d.id ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25'
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Alignment</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {alignments.map((a) => (
            <button
              key={a.id}
              onClick={() => onChange({ alignment: a.id })}
              className={clsx(
                'text-[11px] py-2 rounded-lg border transition',
                clock.alignment === a.id ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25'
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <SliderField label="Size" value={clock.size} min={60} max={140} unit="%" onChange={(v) => onChange({ size: v })} />
      <ColorField label="Clock color" value={clock.color} onChange={(v) => onChange({ color: v })} />
    </div>
  );
}
