import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Theme, ThemeInput } from '../../types/theme';
import { EDITOR_SECTIONS, type EditorSectionId } from './editorSections';
import { AndroidPreview } from '../preview/AndroidPreview';
import { WallpaperEditor } from './WallpaperEditor';
import { ColorCustomizer } from './ColorCustomizer';
import { IconCustomizer } from './IconCustomizer';
import { FontCustomizer } from './FontCustomizer';
import { ClockDesigner } from './ClockDesigner';
import { SystemBarsCustomizer } from './SystemBarsCustomizer';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, Undo2, Redo2, Save, Download, Check } from 'lucide-react';
import clsx from 'clsx';
import { ExportDialog } from './ExportDialog';

interface ThemeEditorProps {
  initial: Theme;
  onSave: (id: string, patch: Partial<ThemeInput>) => void;
  onExported: (id: string) => void;
}

export function ThemeEditor({ initial, onSave, onExported }: ThemeEditorProps) {
  const navigate = useNavigate();
  const { push } = useToast();
  const [section, setSection] = useState<EditorSectionId>('wallpaper');
  const [theme, setTheme] = useState<Theme>(initial);
  const [history, setHistory] = useState<Theme[]>([initial]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [saved, setSaved] = useState(true);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipHistoryPush = useRef(false);

  // Push to history whenever theme changes (except when navigating history itself)
  useEffect(() => {
    if (skipHistoryPush.current) {
      skipHistoryPush.current = false;
      return;
    }
    setHistory((h) => {
      const trimmed = h.slice(0, historyIndex + 1);
      trimmed.push(theme);
      return trimmed.slice(-40); // cap history size
    });
    setHistoryIndex((i) => Math.min(i + 1, 39));
    setSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Debounced autosave
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      onSave(theme.id, theme);
      setSaved(true);
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const patchTheme = useCallback((patch: Partial<Theme>) => {
    setTheme((t) => ({ ...t, ...patch }));
  }, []);

  const undo = () => {
    if (historyIndex === 0) return;
    skipHistoryPush.current = true;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setTheme(history[nextIndex]);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    skipHistoryPush.current = true;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setTheme(history[nextIndex]);
  };

  const handleManualSave = () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    onSave(theme.id, theme);
    setSaved(true);
    push('Theme saved', 'success');
  };

  const renderPanel = () => {
    switch (section) {
      case 'wallpaper':
        return <WallpaperEditor wallpaper={theme.wallpaper} onChange={(p) => patchTheme({ wallpaper: { ...theme.wallpaper, ...p } })} />;
      case 'colors':
        return <ColorCustomizer colors={theme.colors} onChange={(p) => patchTheme({ colors: { ...theme.colors, ...p } })} />;
      case 'icons':
        return <IconCustomizer icon={theme.icon} onChange={(p) => patchTheme({ icon: { ...theme.icon, ...p } })} />;
      case 'font':
        return <FontCustomizer font={theme.font} onChange={(p) => patchTheme({ font: { ...theme.font, ...p } })} />;
      case 'clock':
        return <ClockDesigner clock={theme.clock} onChange={(p) => patchTheme({ clock: { ...theme.clock, ...p } })} />;
      case 'systembars':
        return (
          <SystemBarsCustomizer
            statusBar={theme.statusBar}
            navigation={theme.navigation}
            onStatusBarChange={(p) => patchTheme({ statusBar: { ...theme.statusBar, ...p } })}
            onNavigationChange={(p) => patchTheme({ navigation: { ...theme.navigation, ...p } })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0b0f0c]">
      {/* Top toolbar */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] shrink-0">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={17} />
        </Button>
        <input
          value={theme.name}
          onChange={(e) => patchTheme({ name: e.target.value })}
          className="bg-transparent text-white font-semibold text-sm outline-none border-b border-transparent focus:border-white/20 min-w-0 flex-1 sm:flex-none sm:w-56"
          placeholder="Theme name"
        />
        <span className={clsx('text-[11px] hidden sm:flex items-center gap-1', saved ? 'text-white/30' : 'text-amber-400/80')}>
          {saved ? (
            <>
              <Check size={12} /> Saved
            </>
          ) : (
            'Saving…'
          )}
        </span>
        <div className="flex-1 hidden sm:block" />
        <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex === 0} title="Undo">
          <Undo2 size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
          <Redo2 size={16} />
        </Button>
        <Button variant="secondary" size="md" icon={<Save size={14} />} onClick={handleManualSave} className="hidden sm:inline-flex">
          Save
        </Button>
        <Button variant="primary" size="md" icon={<Download size={14} />} onClick={() => setExportOpen(true)}>
          Export
        </Button>
      </header>

      {/* Body: sidebar / preview / properties */}
      <div className="flex-1 flex min-h-0">
        {/* Left section nav */}
        <nav className="hidden md:flex flex-col w-[76px] border-r border-white/[0.07] py-4 gap-1 shrink-0 overflow-y-auto">
          {EDITOR_SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={clsx(
                'flex flex-col items-center gap-1.5 py-3 mx-2 rounded-xl text-[10px] transition',
                section === id ? 'bg-emerald-500/10 text-emerald-300' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              )}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {/* Center preview */}
        <main className="flex-1 overflow-y-auto py-8 px-4">
          <AndroidPreview theme={theme} />
        </main>

        {/* Right properties panel (desktop) */}
        <aside className="hidden lg:block w-[300px] border-l border-white/[0.07] overflow-y-auto p-5 shrink-0">
          {renderPanel()}
        </aside>
      </div>

      {/* Mobile bottom nav + sheet */}
      <div className="lg:hidden border-t border-white/[0.07] shrink-0">
        <div className="flex overflow-x-auto no-scrollbar">
          {EDITOR_SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setSection(id);
                setMobilePanelOpen(true);
              }}
              className={clsx(
                'flex flex-col items-center gap-1 py-2.5 px-4 text-[10px] shrink-0 transition',
                section === id ? 'text-emerald-300' : 'text-white/40'
              )}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {mobilePanelOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden flex flex-col justify-end" onClick={() => setMobilePanelOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-[#12160f] border-t border-white/10 rounded-t-2xl p-5 max-h-[70vh] overflow-y-auto animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />
            {renderPanel()}
          </div>
        </div>
      )}

      <ExportDialog
        open={exportOpen}
        theme={theme}
        onClose={() => setExportOpen(false)}
        onExported={() => {
          patchTheme({ status: 'exported' });
          onExported(theme.id);
        }}
      />
    </div>
  );
}
