import type { ThemeColors } from '../../types/theme';
import { COLOR_PRESETS } from '../../utils/presets';
import { SectionLabel } from '../ui/Primitives';
import { ColorField } from '../ui/ColorField';
import { Button } from '../ui/Button';
import { Shuffle } from 'lucide-react';
import clsx from 'clsx';

const fields: { key: keyof ThemeColors; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'background', label: 'Background' },
  { key: 'card', label: 'Card' },
  { key: 'text', label: 'Text' },
  { key: 'icon', label: 'Icon' },
  { key: 'statusBar', label: 'Status Bar' },
  { key: 'navigationBar', label: 'Navigation Bar' },
];

function randomHarmoniousPalette(): ThemeColors {
  const hue = Math.floor(Math.random() * 360);
  const hsl = (h: number, s: number, l: number) => `hsl(${h % 360}, ${s}%, ${l}%)`;
  return {
    primary: hsl(hue, 70, 55),
    secondary: hsl(hue, 60, 40),
    accent: hsl((hue + 40) % 360, 75, 65),
    background: hsl(hue, 30, 8),
    card: hsl(hue, 25, 14),
    text: hsl(hue, 15, 95),
    icon: hsl(hue, 15, 90),
    statusBar: hsl(hue, 30, 8),
    navigationBar: hsl(hue, 30, 8),
  };
}

export function ColorCustomizer({
  colors,
  onChange,
}: {
  colors: ThemeColors;
  onChange: (patch: Partial<ThemeColors>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionLabel
          action={
            <Button size="sm" variant="outline" icon={<Shuffle size={12} />} onClick={() => onChange(randomHarmoniousPalette())}>
              Generate Palette
            </Button>
          }
        >
          Presets
        </SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PRESETS.map((p) => {
            const active = colors.primary === p.colors.primary && colors.background === p.colors.background;
            return (
              <button
                key={p.id}
                onClick={() => onChange({ ...p.colors })}
                className={clsx(
                  'flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition',
                  active ? 'border-emerald-400 bg-emerald-500/5' : 'border-white/10 hover:border-white/25'
                )}
              >
                <span className="flex -space-x-1 shrink-0">
                  <span className="w-4 h-4 rounded-full border border-black/30" style={{ background: p.colors.primary }} />
                  <span className="w-4 h-4 rounded-full border border-black/30" style={{ background: p.colors.accent }} />
                  <span className="w-4 h-4 rounded-full border border-black/30" style={{ background: p.colors.background }} />
                </span>
                <span className="text-[11px] text-white/75 truncate">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <SectionLabel>Custom colors</SectionLabel>
        <div className="flex flex-col gap-3">
          {fields.map((f) => (
            <ColorField key={f.key} label={f.label} value={colors[f.key]} onChange={(v) => onChange({ [f.key]: v })} />
          ))}
        </div>
      </div>
    </div>
  );
}
