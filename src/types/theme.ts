export type IconShape = 'circle' | 'rounded-square' | 'square' | 'squircle' | 'teardrop' | 'hexagon';
export type IconStyle = 'flat' | 'material' | 'minimal' | 'glass' | 'gradient' | 'neon';
export type ThemeStatus = 'draft' | 'exported';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  icon: string;
  statusBar: string;
  navigationBar: string;
}

export interface WallpaperConfig {
  /** Either a built-in gradient id or a data URL for an uploaded image */
  source: string;
  type: 'gradient' | 'image';
  blur: number; // 0-20
  brightness: number; // 50-150
  contrast: number; // 50-150
  saturation: number; // 0-200
  overlay: boolean;
  overlayOpacity: number; // 0-100
}

export interface IconConfig {
  shape: IconShape;
  style: IconStyle;
  size: number; // 40-100 (px equivalent scale)
  radius: number; // 0-50 (%)
  shadow: boolean;
}

export interface FontConfig {
  family: string;
  size: number; // base scale 80-130
  weight: number; // 300-700
}

export interface ClockConfig {
  design: 'digital' | 'minimal' | 'modern' | 'classic' | 'neon' | 'large' | 'material-you';
  size: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
}

export interface StatusBarConfig {
  color: string;
  transparent: boolean;
  iconColor: string;
}

export interface NavigationConfig {
  color: string;
  transparent: boolean;
  style: 'gesture' | 'buttons';
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  status: ThemeStatus;
  favorite: boolean;
  wallpaper: WallpaperConfig;
  colors: ThemeColors;
  icon: IconConfig;
  font: FontConfig;
  clock: ClockConfig;
  statusBar: StatusBarConfig;
  navigation: NavigationConfig;
  createdAt: string;
  updatedAt: string;
}

export type ThemeInput = Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>;
