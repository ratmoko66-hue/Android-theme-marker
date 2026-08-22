import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Theme } from '../types/theme';
import { StatCard } from '../components/dashboard/StatCard';
import { ThemeCard } from '../components/dashboard/ThemeCard';
import { EmptyState, ConfirmDialog, Loading } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Palette, FileClock, CheckCircle2, Star, Plus, Upload, FolderOpen, Image, AppWindow, Sparkles } from 'lucide-react';
import { useThemes } from '../hooks/useThemes';
import { useToast } from '../hooks/useToast';
import { createDefaultThemeInput } from '../utils/themeFactory';
import { ImportDialog } from '../components/dashboard/ImportDialog';

export function DashboardPage() {
  const navigate = useNavigate();
  const { push } = useToast();
  const { themes, loading, createTheme, duplicateTheme, deleteTheme, toggleFavorite, markExported } = useThemes();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);

  const stats = {
    total: themes.length,
    draft: themes.filter((t) => t.status === 'draft').length,
    exported: themes.filter((t) => t.status === 'exported').length,
    favorite: themes.filter((t) => t.favorite).length,
  };

  const handleCreate = () => {
    const theme = createTheme(createDefaultThemeInput('Untitled Theme'));
    navigate(`/editor/${theme.id}`);
  };

  const quickActions = [
    { label: 'Create New Theme', icon: Plus, onClick: handleCreate },
    { label: 'Import Theme', icon: Upload, onClick: () => setImportOpen(true) },
    { label: 'My Themes', icon: FolderOpen, onClick: () => navigate('/themes') },
    { label: 'Wallpaper', icon: Image, onClick: () => navigate('/wallpapers') },
    { label: 'Icon Pack', icon: AppWindow, onClick: () => navigate('/icons') },
    { label: 'Templates', icon: Sparkles, onClick: () => navigate('/templates') },
  ];

  const recent = themes.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Design, preview, and manage your Android themes.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard icon={<Palette size={17} />} label="Total Theme" value={stats.total} accent="#22c55e" />
        <StatCard icon={<FileClock size={17} />} label="Draft Theme" value={stats.draft} accent="#f59e0b" />
        <StatCard icon={<CheckCircle2 size={17} />} label="Exported Theme" value={stats.exported} accent="#0ea5e9" />
        <StatCard icon={<Star size={17} />} label="Favorite Theme" value={stats.favorite} accent="#d4af37" />
      </div>

      {/* Quick actions */}
      <div className="mb-9">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-[#12160f]/80 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition py-4 px-2"
            >
              <a.icon size={18} className="text-emerald-300" />
              <span className="text-[11px] text-white/70 text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent themes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Recent themes</h2>
          {themes.length > 0 && (
            <button onClick={() => navigate('/themes')} className="text-xs text-emerald-300 hover:text-emerald-200 transition">
              View all
            </button>
          )}
        </div>

        {loading ? (
          <Loading />
        ) : recent.length === 0 ? (
          <EmptyState
            icon={<Palette size={22} />}
            title="No themes yet"
            description="Create your first Android theme to get started."
            action={<Button variant="primary" icon={<Plus size={14} />} onClick={handleCreate}>Create Theme</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((t: Theme) => (
              <ThemeCard
                key={t.id}
                theme={t}
                onDuplicate={() => {
                  duplicateTheme(t.id);
                  push('Theme duplicated', 'success');
                }}
                onDelete={() => setConfirmDeleteId(t.id)}
                onToggleFavorite={() => toggleFavorite(t.id)}
                onExport={() => {
                  markExported(t.id);
                  push('Theme marked as exported', 'success');
                  navigate(`/editor/${t.id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title="Delete theme?"
        description="This will permanently remove the theme and its configuration. This action cannot be undone."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteTheme(confirmDeleteId);
            push('Theme deleted', 'success');
          }
          setConfirmDeleteId(null);
        }}
      />

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
