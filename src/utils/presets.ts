import type { ThemeColors } from '../types/theme';

export interface GradientPreset {
  id: string;
  name: string;
  category: 'Nature' | 'Islamic' | 'Abstract' | 'Minimal' | 'Dark' | 'Gradient' | 'Space' | 'City';
  css: string;
}

export const WALLPAPER_PRESETS: GradientPreset[] = [
  { id: 'nature-1', name: 'Emerald Forest', category: 'Nature', css: 'linear-gradient(160deg,#0f3d2e 0%,#1f7a5c 55%,#4fbf8b 100%)' },
  { id: 'nature-2', name: 'Sage Morning', category: 'Nature', css: 'linear-gradient(160deg,#233d2f 0%,#5c8a68 60%,#c8dcc0 100%)' },
  { id: 'islamic-1', name: 'Emerald & Gold', category: 'Islamic', css: 'linear-gradient(160deg,#04231a 0%,#0d4b34 45%,#b68a35 100%)' },
  { id: 'islamic-2', name: 'Masjid Night', category: 'Islamic', css: 'radial-gradient(circle at 50% 20%,#1a5c42 0%,#08211a 70%)' },
  { id: 'abstract-1', name: 'Fluid Waves', category: 'Abstract', css: 'linear-gradient(135deg,#2b1055 0%,#7597de 100%)' },
  { id: 'abstract-2', name: 'Soft Blobs', category: 'Abstract', css: 'radial-gradient(circle at 20% 20%,#ff9a8b 0%,transparent 50%), radial-gradient(circle at 80% 80%,#6a82fb 0%,transparent 50%), #1c1c1e' },
  { id: 'minimal-1', name: 'Paper White', category: 'Minimal', css: 'linear-gradient(180deg,#f7f5f0 0%,#e9e5db 100%)' },
  { id: 'minimal-2', name: 'Cloud Grey', category: 'Minimal', css: 'linear-gradient(180deg,#eef0f2 0%,#cfd6dc 100%)' },
  { id: 'dark-1', name: 'AMOLED Black', category: 'Dark', css: 'linear-gradient(180deg,#000000 0%,#0a0a0a 100%)' },
  { id: 'dark-2', name: 'Charcoal Depth', category: 'Dark', css: 'linear-gradient(160deg,#101012 0%,#26262b 100%)' },
  { id: 'gradient-1', name: 'Sunset Gold', category: 'Gradient', css: 'linear-gradient(160deg,#3a1c02 0%,#b8752c 55%,#f0c869 100%)' },
  { id: 'gradient-2', name: 'Ocean Depth', category: 'Gradient', css: 'linear-gradient(160deg,#031b2e 0%,#0d5c73 55%,#3fc1c9 100%)' },
  { id: 'space-1', name: 'Nebula', category: 'Space', css: 'radial-gradient(circle at 30% 30%,#3b1c6b 0%,transparent 55%), radial-gradient(circle at 70% 70%,#0d1b4c 0%,transparent 55%), #000010' },
  { id: 'space-2', name: 'Starfield', category: 'Space', css: 'radial-gradient(circle at 50% 0%,#1a1a3d 0%,#000006 70%)' },
  { id: 'city-1', name: 'Neon Skyline', category: 'City', css: 'linear-gradient(160deg,#1a0533 0%,#5c1a72 45%,#e0457b 100%)' },
  { id: 'city-2', name: 'Blue Hour', category: 'City', css: 'linear-gradient(160deg,#0a1128 0%,#1e3a5f 55%,#4a6fa5 100%)' },
];

export interface ColorPreset {
  id: string;
  name: string;
  colors: ThemeColors;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'emerald', name: 'Emerald', colors: { primary: '#10b981', secondary: '#059669', accent: '#d4af37', background: '#0b1f18', card: '#12291f', text: '#f2f6f3', icon: '#e8f5ee', statusBar: '#0b1f18', navigationBar: '#0b1f18' } },
  { id: 'ocean', name: 'Ocean', colors: { primary: '#0ea5e9', secondary: '#0369a1', accent: '#67e8f9', background: '#04121c', card: '#0b2438', text: '#eef7fb', icon: '#dff2fb', statusBar: '#04121c', navigationBar: '#04121c' } },
  { id: 'purple', name: 'Purple', colors: { primary: '#8b5cf6', secondary: '#6d28d9', accent: '#f0abfc', background: '#150a24', card: '#20123a', text: '#f5f1fb', icon: '#ecdffc', statusBar: '#150a24', navigationBar: '#150a24' } },
  { id: 'sunset', name: 'Sunset', colors: { primary: '#f97316', secondary: '#ea580c', accent: '#fde047', background: '#210f04', card: '#391a06', text: '#fff6ec', icon: '#ffe8cf', statusBar: '#210f04', navigationBar: '#210f04' } },
  { id: 'gold', name: 'Gold', colors: { primary: '#d4af37', secondary: '#b8860b', accent: '#f5deb3', background: '#1a1608', card: '#2b230f', text: '#fbf6e8', icon: '#f4e7bf', statusBar: '#1a1608', navigationBar: '#1a1608' } },
  { id: 'amoled', name: 'AMOLED Black', colors: { primary: '#22c55e', secondary: '#16a34a', accent: '#ffffff', background: '#000000', card: '#0d0d0d', text: '#f5f5f5', icon: '#e5e5e5', statusBar: '#000000', navigationBar: '#000000' } },
  { id: 'material-you', name: 'Material You', colors: { primary: '#6750a4', secondary: '#958da5', accent: '#7d5260', background: '#1c1b1f', card: '#2b2930', text: '#e6e1e5', icon: '#cac4d0', statusBar: '#1c1b1f', navigationBar: '#1c1b1f' } },
  { id: 'islamic-green', name: 'Islamic Green', colors: { primary: '#0f7a4a', secondary: '#0a5c37', accent: '#c9a227', background: '#06170f', card: '#0d2a1c', text: '#f2f8f4', icon: '#dff2e6', statusBar: '#06170f', navigationBar: '#06170f' } },
];

export const FONT_FAMILIES = [
  { id: 'manrope', name: 'Manrope', css: "'Manrope', sans-serif" },
  { id: 'inter', name: 'Inter', css: "'Inter', sans-serif" },
  { id: 'poppins', name: 'Poppins', css: "'Poppins', sans-serif" },
  { id: 'roboto', name: 'Roboto', css: "'Roboto', sans-serif" },
  { id: 'system', name: 'System Default', css: "-apple-system, BlinkMacSystemFont, sans-serif" },
];

export const DEMO_APPS = [
  { id: 'phone', name: 'Phone', color: '#22c55e', emoji: '📞' },
  { id: 'messages', name: 'Messages', color: '#3b82f6', emoji: '💬' },
  { id: 'camera', name: 'Camera', color: '#64748b', emoji: '📷' },
  { id: 'gallery', name: 'Gallery', color: '#f59e0b', emoji: '🖼️' },
  { id: 'chrome', name: 'Chrome', color: '#ef4444', emoji: '🌐' },
  { id: 'youtube', name: 'YouTube', color: '#dc2626', emoji: '▶️' },
  { id: 'settings', name: 'Settings', color: '#6b7280', emoji: '⚙️' },
  { id: 'whatsapp', name: 'WhatsApp', color: '#25d366', emoji: '💚' },
];
