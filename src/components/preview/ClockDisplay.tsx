import type { ClockConfig } from '../../types/theme';

const alignmentClass: Record<ClockConfig['alignment'], string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export function ClockDisplay({ clock }: { clock: ClockConfig }) {
  const scale = clock.size / 100;

  const weightByDesign: Record<ClockConfig['design'], string> = {
    digital: 'font-mono font-bold',
    minimal: 'font-light',
    modern: 'font-semibold',
    classic: 'font-serif font-medium',
    neon: 'font-bold',
    large: 'font-extrabold',
    'material-you': 'font-medium',
  };

  const timeSize = clock.design === 'large' ? 56 : clock.design === 'minimal' ? 40 : 46;

  return (
    <div className={`flex flex-col ${alignmentClass[clock.alignment]}`}>
      <div
        className={weightByDesign[clock.design]}
        style={{
          color: clock.color,
          fontSize: timeSize * scale,
          lineHeight: 1,
          textShadow: clock.design === 'neon' ? `0 0 12px ${clock.color}, 0 0 24px ${clock.color}` : '0 1px 8px rgba(0,0,0,0.4)',
        }}
      >
        9:41
      </div>
      <div
        className="mt-1.5 opacity-80"
        style={{ color: clock.color, fontSize: 13 * scale, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
      >
        Friday, August 21
      </div>
    </div>
  );
}
