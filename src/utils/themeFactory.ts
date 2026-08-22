import type { Theme, ThemeInput } from '../types/theme';
import { COLOR_PRESETS, WALLPAPER_PRESETS, FONT_FAMILIES } from './presets';

export function generateId(prefix = 'theme'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createDefaultThemeInput(name = 'Untitled Theme'): ThemeInput {
  const preset = COLOR_PRESETS[0];
  return {
    name,
    description: '',
    status: 'draft',
    favorite: false,
    wallpaper: {
      source: WALLPAPER_PRESETS[0].id,
      type: 'gradient',
      blur: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      overlay: false,
      overlayOpacity: 30,
    },
    colors: { ...preset.colors },
    icon: {
      shape: 'squircle',
      style: 'material',
      size: 64,
      radius: 24,
      shadow: true,
    },
    font: {
      family: FONT_FAMILIES[0].id,
      size: 100,
      weight: 500,
    },
    clock: {
      design: 'modern',
      size: 100,
      color: '#ffffff',
      alignment: 'center',
    },
    statusBar: {
      color: preset.colors.statusBar,
      transparent: true,
      iconColor: '#ffffff',
    },
    navigation: {
      color: preset.colors.navigationBar,
      transparent: true,
      style: 'gesture',
    },
  };
}

export function hydrateTheme(input: ThemeInput, id?: string): Theme {
  const now = new Date().toISOString();
  return {
    ...input,
    id: id ?? generateId(),
    createdAt: now,
    updatedAt: now,
  };
}
