import { useNavigate } from 'react-router-dom';
import { COLOR_PRESETS, WALLPAPER_PRESETS } from '../utils/presets';
import { createDefaultThemeInput } from '../utils/themeFactory';
import { useThemes } from '../hooks/useThemes';
import { useToast } from '../hooks/useToast';
import type { ThemeInput } from '../types/theme';

interface TemplateSpec {
  id: string;
  name: string;
  description: string;
  colorPreset: string;
  wallpaper: string;
  iconShape: ThemeInput['icon']['shape'];
  iconStyle: ThemeInput['icon']['style'];
}

const TEMPLATES: TemplateSpec[] = [
  { id: 't1', name: 'Islamic Green', description: 'Hijau elegan + gold + wallpaper islami', colorPreset: 'islamic-green', wallpaper: 'islamic-1', iconShape: 'squircle', iconStyle: 'material' },
  { id: 't2', name: 'AMOLED', description: 'Black AMOLED + minimal icons', colorPreset: 'amoled', wallpaper: 'dark-1', iconShape: 'circle', iconStyle: 'minimal' },
  { id: 't3', name: 'Material You', description: 'Dynamic color + rounded widgets', colorPreset: 'material-you', wallpaper: 'abstract-1', iconShape: 'rounded-square', iconStyle: 'material' },
  { id: 't4', name: 'Elegant Gold', description: 'Dark background + gold accent', colorPreset: 'gold', wallpaper: 'gradient-1', iconShape: 'squircle', iconStyle: 'gradient' },
  { id: 't5', name: 'Nature', description: 'Green + nature wallpaper', colorPreset: 'emerald', wallpaper: 'nature-1', iconShape: 'circle', iconStyle: 'flat' },
  { id: 't6', name: 'Minimal White', description: 'White + clean icon', colorPreset: 'ocean', wallpaper: 'minimal-1', iconShape: 'rounded-square', iconStyle: 'minimal' },
];

export function TemplatesPage() {
  const navigate = useNavigate();
  const { createTheme } = useThemes();
  const { push } = useToast();

  const useTemplate = (spec: TemplateSpec) => {
    const preset = COLOR_PRESETS.find((p) => p.id === spec.colorPreset) ?? COLOR_PRESETS[0];
    const wallpaper = WALLPAPER_PRESETS.find((w) => w.id === spec.wallpaper) ?? WALLPAPER_PRESETS[0];
    const base = createDefaultThemeInput(spec.name);
    const theme = createTheme({
      ...base,
      description: spec.description,
      colors: { ...preset.colors },
      wallpaper: { ...base.wallpaper, source: wallpaper.id, type: 'gradient' },
      icon: { ...base.icon, shape: spec.iconShape, style: spec.iconStyle },
      statusBar: { ...base.statusBar, color: preset.colors.statusBar },
      navigation: { ...base.navigation, color: preset.colors.navigationBar },
    });
    push(`"${spec.name}" template applied`, 'success');
    navigate(`/editor/${theme.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Theme Templates</h1>
      <p className="text-white/40 text-sm mb-6">Start from a ready-made look, then customize every detail.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => {
          const preset = COLOR_PRESETS.find((p) => p.id === t.colorPreset) ?? COLOR_PRESETS[0];
          const wallpaper = WALLPAPER_PRESETS.find((w) => w.id === t.wallpaper) ?? WALLPAPER_PRESETS[0];
          return (
            <div key={t.id} className="rounded-2xl border border-white/[0.07] bg-[#12160f]/80 overflow-hidden hover:border-white/15 transition">
              <div className="h-32 relative" style={{ background: wallpaper.css }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 flex gap-1.5">
                  {[preset.colors.primary, preset.colors.accent, preset.colors.background].map((c, i) => (
                    <span key={i} className="w-4 h-4 rounded-full border border-white/30" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                <p className="text-[11px] text-white/45 mt-1 mb-3.5">{t.description}</p>
                <button
                  onClick={() => useTemplate(t)}
                  className="w-full text-xs font-medium py-2 rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-400 transition"
                >
                  Use Template
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
