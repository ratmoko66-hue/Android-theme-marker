import type { IconConfig } from '../../types/theme';
import { getIconRadius } from '../../utils/wallpaperCss';

interface AppIconProps {
  emoji: string;
  color: string;
  name?: string;
  icon: IconConfig;
  showLabel?: boolean;
  labelColor?: string;
}

export function AppIcon({ emoji, color, name, icon, showLabel, labelColor = '#ffffff' }: AppIconProps) {
  const size = (icon.size / 100) * 44 + 20; // scale to ~30-64px
  const radius = getIconRadius(icon.shape, icon.radius);

  const styleBg: Record<string, string> = {
    flat: color,
    material: color,
    minimal: 'rgba(255,255,255,0.12)',
    glass: 'rgba(255,255,255,0.14)',
    gradient: `linear-gradient(135deg, ${color}, ${color}99)`,
    neon: 'rgba(0,0,0,0.4)',
  };

  const extraStyle: React.CSSProperties =
    icon.style === 'glass'
      ? { backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.25)' }
      : icon.style === 'neon'
      ? { border: `1.5px solid ${color}`, boxShadow: `0 0 10px ${color}88, inset 0 0 8px ${color}44` }
      : icon.style === 'minimal'
      ? { border: '1px solid rgba(255,255,255,0.15)' }
      : {};

  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size + 8 }}>
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: styleBg[icon.style],
          boxShadow: icon.shadow ? '0 4px 10px rgba(0,0,0,0.35)' : undefined,
          fontSize: size * 0.5,
          ...extraStyle,
        }}
      >
        {emoji}
      </div>
      {showLabel && name && (
        <span className="text-[9.5px] leading-tight truncate max-w-full" style={{ color: labelColor, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {name}
        </span>
      )}
    </div>
  );
}
