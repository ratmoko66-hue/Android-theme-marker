import { useRef, useState } from 'react';
import type { WallpaperConfig } from '../../types/theme';
import { WALLPAPER_PRESETS } from '../../utils/presets';
import { SectionLabel } from '../ui/Primitives';
import { SliderField } from '../ui/SliderField';
import { Upload } from 'lucide-react';
import clsx from 'clsx';

const categories = Array.from(new Set(WALLPAPER_PRESETS.map((w) => w.category)));

export function WallpaperEditor({
  wallpaper,
  onChange,
}: {
  wallpaper: WallpaperConfig;
  onChange: (patch: Partial<WallpaperConfig>) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 8 * 1024 * 1024) return; // 8MB limit
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ source: reader.result, type: 'image' });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionLabel>Upload</SectionLabel>
        <div
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleUpload(file);
          }}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-6 cursor-pointer hover:border-emerald-500/40 hover:bg-white/[0.02] transition"
        >
          <Upload size={18} className="text-white/40" />
          <span className="text-xs text-white/50">Drag & drop or click to upload</span>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </div>
      </div>

      <div>
        <SectionLabel>Built-in wallpapers</SectionLabel>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={clsx(
                'text-[10.5px] px-2.5 py-1 rounded-full border transition',
                activeCategory === c
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/10 text-white/45 hover:text-white/70'
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {WALLPAPER_PRESETS.filter((w) => w.category === activeCategory).map((w) => (
            <button
              key={w.id}
              onClick={() => onChange({ source: w.id, type: 'gradient' })}
              className={clsx(
                'aspect-[3/4] rounded-lg border-2 transition relative overflow-hidden',
                wallpaper.type === 'gradient' && wallpaper.source === w.id
                  ? 'border-emerald-400'
                  : 'border-transparent hover:border-white/20'
              )}
              style={{ background: w.css }}
              title={w.name}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Adjustments</SectionLabel>
        <div className="flex flex-col gap-3.5">
          <SliderField label="Blur" value={wallpaper.blur} min={0} max={20} unit="px" onChange={(v) => onChange({ blur: v })} />
          <SliderField label="Brightness" value={wallpaper.brightness} min={50} max={150} unit="%" onChange={(v) => onChange({ brightness: v })} />
          <SliderField label="Contrast" value={wallpaper.contrast} min={50} max={150} unit="%" onChange={(v) => onChange({ contrast: v })} />
          <SliderField label="Saturation" value={wallpaper.saturation} min={0} max={200} unit="%" onChange={(v) => onChange({ saturation: v })} />
        </div>
      </div>

      <div>
        <SectionLabel
          action={
            <label className="flex items-center gap-1.5 text-[11px] text-white/50 cursor-pointer">
              <input
                type="checkbox"
                checked={wallpaper.overlay}
                onChange={(e) => onChange({ overlay: e.target.checked })}
                className="accent-emerald-500"
              />
              Enable
            </label>
          }
        >
          Gradient overlay
        </SectionLabel>
        {wallpaper.overlay && (
          <SliderField label="Overlay opacity" value={wallpaper.overlayOpacity} min={0} max={100} unit="%" onChange={(v) => onChange({ overlayOpacity: v })} />
        )}
      </div>
    </div>
  );
}
