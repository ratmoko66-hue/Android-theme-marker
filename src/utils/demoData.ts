import type { Theme } from '../types/theme';
import { createDefaultThemeInput, hydrateTheme } from './themeFactory';
import { COLOR_PRESETS, WALLPAPER_PRESETS } from './presets';

function findPreset(id: string) {
  return COLOR_PRESETS.find((p) => p.id === id) ?? COLOR_PRESETS[0];
}
function findWallpaper(id: string) {
  return WALLPAPER_PRESETS.find((w) => w.id === id) ?? WALLPAPER_PRESETS[0];
}

export function buildDemoThemes(): Theme[] {
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

  const specs: Array<{
    name: string;
    description: string;
    colorPreset: string;
    wallpaper: string;
    status: 'draft' | 'exported';
    favorite: boolean;
    age: number;
  }> = [
    { name: 'Islamic Emerald', description: 'Elegant emerald green with gold accents', colorPreset: 'islamic-green', wallpaper: 'islamic-1', status: 'exported', favorite: true, age: 1 },
    { name: 'AMOLED Dark', description: 'Pure black for OLED battery saving', colorPreset: 'amoled', wallpaper: 'dark-1', status: 'exported', favorite: false, age: 3 },
    { name: 'Material Green', description: 'Dynamic Material You inspired palette', colorPreset: 'emerald', wallpaper: 'gradient-2', status: 'draft', favorite: false, age: 5 },
    { name: 'Elegant Gold', description: 'Dark charcoal background with gold highlights', colorPreset: 'gold', wallpaper: 'gradient-1', status: 'draft', favorite: true, age: 2 },
    { name: 'Minimal White', description: 'Clean and simple light theme', colorPreset: 'ocean', wallpaper: 'minimal-1', status: 'exported', favorite: false, age: 7 },
  ];

  return specs.map((spec) => {
    const base = createDefaultThemeInput(spec.name);
    const preset = findPreset(spec.colorPreset);
    const wallpaper = findWallpaper(spec.wallpaper);
    const theme = hydrateTheme({
      ...base,
      description: spec.description,
      status: spec.status,
      favorite: spec.favorite,
      colors: { ...preset.colors },
      wallpaper: { ...base.wallpaper, source: wallpaper.id, type: 'gradient' },
      statusBar: { ...base.statusBar, color: preset.colors.statusBar },
      navigation: { ...base.navigation, color: preset.colors.navigationBar },
    });
    const createdAt = daysAgo(spec.age);
    return { ...theme, createdAt, updatedAt: createdAt };
  });
}
