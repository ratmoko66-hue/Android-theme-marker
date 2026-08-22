import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Theme } from '../../types/theme';
import { getWallpaperBackground } from '../../utils/wallpaperCss';
import { Star, MoreVertical, Pencil, Copy, Trash2, Download } from 'lucide-react';
import clsx from 'clsx';

export function ThemeCard({
  theme,
  onDuplicate,
  onDelete,
  onToggleFavorite,
  onExport,
}: {
  theme: Theme;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  onExport: () => void;
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const bg = getWallpaperBackground(theme.wallpaper);
  const date = new Date(theme.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#12160f]/80 overflow-hidden hover:border-white/15 transition relative">
      <div
        className="h-32 relative cursor-pointer"
        style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
        onClick={() => navigate(`/editor/${theme.id}`)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span
            className={clsx(
              'text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm font-medium capitalize',
              theme.status === 'exported' ? 'bg-emerald-500/25 text-emerald-200' : 'bg-white/15 text-white/80'
            )}
          >
            {theme.status}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition"
        >
          <Star size={13} className={theme.favorite ? 'fill-amber-400 text-amber-400' : 'text-white/70'} />
        </button>
        <div className="absolute bottom-2 left-3 flex gap-1.5">
          {[theme.colors.primary, theme.colors.accent, theme.colors.background].map((c, i) => (
            <span key={i} className="w-4 h-4 rounded-full border border-white/30" style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{theme.name}</h4>
            <p className="text-[11px] text-white/40 mt-0.5">{date}</p>
          </div>
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition"
            >
              <MoreVertical size={15} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-white/10 bg-[#181d15] shadow-xl p-1 animate-scale-in">
                  <MenuItem icon={<Pencil size={13} />} label="Edit" onClick={() => navigate(`/editor/${theme.id}`)} />
                  <MenuItem icon={<Copy size={13} />} label="Duplicate" onClick={onDuplicate} />
                  <MenuItem icon={<Download size={13} />} label="Export" onClick={onExport} />
                  <MenuItem icon={<Trash2 size={13} />} label="Delete" danger onClick={onDelete} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        'w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition',
        danger ? 'text-red-400 hover:bg-red-500/10' : 'text-white/75 hover:bg-white/[0.06]'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
