import type { NavigationConfig, StatusBarConfig } from '../../types/theme';
import { SectionLabel } from '../ui/Primitives';
import { ColorField } from '../ui/ColorField';
import clsx from 'clsx';

export function SystemBarsCustomizer({
  statusBar,
  navigation,
  onStatusBarChange,
  onNavigationChange,
}: {
  statusBar: StatusBarConfig;
  navigation: NavigationConfig;
  onStatusBarChange: (patch: Partial<StatusBarConfig>) => void;
  onNavigationChange: (patch: Partial<NavigationConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Status bar</SectionLabel>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between text-xs text-white/60">
            Transparent
            <input
              type="checkbox"
              checked={statusBar.transparent}
              onChange={(e) => onStatusBarChange({ transparent: e.target.checked })}
              className="accent-emerald-500"
            />
          </label>
          {!statusBar.transparent && <ColorField label="Background color" value={statusBar.color} onChange={(v) => onStatusBarChange({ color: v })} />}
          <ColorField label="Icon color" value={statusBar.iconColor} onChange={(v) => onStatusBarChange({ iconColor: v })} />
        </div>
      </div>

      <div>
        <SectionLabel>Navigation bar</SectionLabel>
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-xs text-white/60 block mb-1.5">Button style</span>
            <div className="grid grid-cols-2 gap-2">
              {(['gesture', 'buttons'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onNavigationChange({ style: s })}
                  className={clsx(
                    'text-[11px] py-2 rounded-lg border capitalize transition',
                    navigation.style === s ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between text-xs text-white/60">
            Transparent
            <input
              type="checkbox"
              checked={navigation.transparent}
              onChange={(e) => onNavigationChange({ transparent: e.target.checked })}
              className="accent-emerald-500"
            />
          </label>
          {!navigation.transparent && <ColorField label="Background color" value={navigation.color} onChange={(v) => onNavigationChange({ color: v })} />}
        </div>
      </div>
    </div>
  );
}
