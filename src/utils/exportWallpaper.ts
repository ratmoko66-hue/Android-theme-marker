import type { WallpaperConfig } from '../types/theme';
import { WALLPAPER_PRESETS } from './presets';

/** Renders the current wallpaper (gradient or uploaded image) to a PNG data URL, 1080x2340 (approx Android portrait). */
export async function renderWallpaperToDataUrl(wallpaper: WallpaperConfig): Promise<string> {
  const width = 1080;
  const height = 2340;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  if (wallpaper.type === 'image') {
    const img = await loadImage(wallpaper.source);
    // cover-fit
    const scale = Math.max(width / img.width, height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
  } else {
    const preset = WALLPAPER_PRESETS.find((p) => p.id === wallpaper.source) ?? WALLPAPER_PRESETS[0];
    paintApproximateGradient(ctx, width, height, preset.css);
  }

  if (wallpaper.overlay) {
    ctx.fillStyle = `rgba(0,0,0,${wallpaper.overlayOpacity / 100})`;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL('image/png');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Extracts hex colors from a CSS gradient string and paints a simple two-stop linear gradient as an approximation. */
function paintApproximateGradient(ctx: CanvasRenderingContext2D, width: number, height: number, css: string) {
  const hexMatches = css.match(/#[0-9a-fA-F]{6}/g) ?? ['#0b0f0c', '#22c55e'];
  const grad = ctx.createLinearGradient(0, 0, width * 0.3, height);
  const stops = hexMatches.length > 1 ? hexMatches : [hexMatches[0], hexMatches[0]];
  stops.forEach((color, i) => {
    grad.addColorStop(i / (stops.length - 1 || 1), color);
  });
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}
