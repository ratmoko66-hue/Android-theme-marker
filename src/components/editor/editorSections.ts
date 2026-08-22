import { Image, Palette, AppWindow, Type, Clock, PanelTop } from 'lucide-react';
import type { ComponentType } from 'react';

export type EditorSectionId = 'wallpaper' | 'colors' | 'icons' | 'font' | 'clock' | 'systembars';

export const EDITOR_SECTIONS: { id: EditorSectionId; label: string; icon: ComponentType<{ size?: number }> }[] = [
  { id: 'wallpaper', label: 'Wallpaper', icon: Image },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'icons', label: 'Icons', icon: AppWindow },
  { id: 'font', label: 'Font', icon: Type },
  { id: 'clock', label: 'Clock', icon: Clock },
  { id: 'systembars', label: 'System Bars', icon: PanelTop },
];
