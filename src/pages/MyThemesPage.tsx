import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, Search, Plus, Palette } from 'lucide-react';
import { useThemes } from '../hooks/useThemes';
import { useToast } from '../hooks/useToast';
import { ThemeCard } from '../components/dashboard/ThemeCard';
import { EmptyState, ConfirmDialog, Loading } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { createDefaultThemeInput } from '../utils/themeFactory';
import { getWallpaperBackground } from '../utils/wallpaperCss';
import clsx from 'clsx';

type Filter = 'all' | 'favorite' | 'draft' | 'exported';
type ViewMode = 'grid' | 'list';

export function MyThemesPage() {
  const navigate = useNavigate();
  const { push } = useToast();
  const { themes, loading, createTheme, duplicateTheme, deleteTheme, toggleFavorite, markExported } = useThemes();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return themes.filter((t) => {
      if (filter === 'favorite' && !t.favorite) return false;
      if (filter === 'draft' && t.status !== 'draft') return false;
      if (filter === 'exported' && t.status !== 'exported') return false;
      if (query.trim() && !t.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [themes, filter, query]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'favorite', label: 'Favorite' },
    { id: 'draft', label: 'Draft' },
    { id: 'exported', label: 'Exported' },
  ];

  const handleCreate = () => {
    const theme = createTheme(createDefaultThemeInput('Untitled Theme'));
    navigate(`/editor/${theme.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">My Themes</h1>
          <p className="text-white/40 text-sm mt-1">{themes.length} theme{themes.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={handleCreate}>Create Theme</Button>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search themes by name..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-500/40"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                'text-xs font-medium px-3 py-1.5 rounded-lg transition',
                filter === f.id ? 'bg-emerald-500 text-emerald-950' : 'text-white/50 hover:text-white/80'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <button onClick={() => setView('grid')} className={clsx('p-1.5 rounded-lg transition', view === 'grid' ? 'bg-emerald-500 text-emerald-950' : 'text-white/50 hover:text-white/80')}>
            <LayoutGrid size={14} />
          </button>
          <button onClick={() => setView('list')} className={clsx('p-1.5 rounded-lg transition', view === 'list' ? 'bg-emerald-500 text-emerald-950' : 'text-white/50 hover:text-white/80')}>
            <List size={14} />
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Palette size={22} />}
          title={themes.length === 0 ? 'No themes yet' : 'No themes match your filters'}
          description={themes.length === 0 ? 'Create your first Android theme to get started.' : 'Try a different search term or filter.'}
          action={themes.length === 0 ? <Button variant="primary" icon={<Plus size={14} />} onClick={handleCreate}>Create Theme</Button> : undefined}
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <ThemeCard
              key={t.id}
              theme={t}
              onDuplicate={() => { duplicateTheme(t.id); push('Theme duplicated', 'success'); }}
              onDelete={() => setConfirmDeleteId(t.id)}
              onToggleFavorite={() => toggleFavorite(t.id)}
              onExport={() => { markExported(t.id); push('Theme marked as exported', 'success'); navigate(`/editor/${t.id}`); }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/editor/${t.id}`)}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#12160f]/80 hover:border-white/15 transition p-3 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg shrink-0" style={{ background: getWallpaperBackground(t.wallpaper), backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{t.name}</div>
                <div className="text-[11px] text-white/40 capitalize">{t.status} · {new Date(t.createdAt).toLocaleDateString()}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
              >
                {t.favorite ? '★' : '☆'}
              </Button>
              <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); duplicateTheme(t.id); push('Duplicated', 'success'); }}>Duplicate</Button>
              <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(t.id); }}>Delete</Button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title="Delete theme?"
        description="This will permanently remove the theme and its configuration. This action cannot be undone."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) { deleteTheme(confirmDeleteId); push('Theme deleted', 'success'); }
          setConfirmDeleteId(null);
        }}
      />
    </div>
  );
}
