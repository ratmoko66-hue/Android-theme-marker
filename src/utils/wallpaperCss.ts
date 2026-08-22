import type { WallpaperConfig } from '../types/theme';
import { WALLPAPER_PRESETS } from './presets';

export function getWallpaperBackground(wallpaper: WallpaperConfig): string {
  if (wallpaper.type === 'image') {
    return `url(${wallpaper.source})`;
  }
  const preset = WALLPAPER_PRESETS.find((w) => w.id === wallpaper.source);
  return preset?.css ?? WALLPAPER_PRESETS[0].css;
}

export function getWallpaperFilter(wallpaper: WallpaperConfig): string {
  return `blur(${wallpaper.blur}px) brightness(${wallpaper.brightness}%) contrast(${wallpaper.contrast}%) saturate(${wallpaper.saturation}%)`;
}

export function getIconRadius(shape: string, radius: number): string {
  switch (shape) {
    case 'circle':
      return '50%';
    case 'square':
      return '4px';
    case 'rounded-square':
      return '22%';
    case 'squircle':
      return `${radius}%`;
    case 'teardrop':
      return '50% 50% 50% 0%';
    case 'hexagon':
      return '18%'; // approximated with clip-path elsewhere if needed
    default:
      return '22%';
  }
}
