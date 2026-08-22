import { useState } from 'react';
import JSZip from 'jszip';
import type { Theme } from '../../types/theme';
import { Button } from '../ui/Button';
import { X, Image, FileJson, Package, Palette } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { renderWallpaperToDataUrl } from '../../utils/exportWallpaper';

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] ?? 'image/png';
  const bin = atob(base64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function slugify(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'theme';
}

export function ExportDialog({
  open,
  theme,
  onClose,
  onExported,
}: {
  open: boolean;
  theme: Theme;
  onClose: () => void;
  onExported?: () => void;
}) {
  const { push } = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  if (!open) return null;
  const slug = slugify(theme.name);

  const buildConfigJson = () =>
    JSON.stringify(
      {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        wallpaper: theme.wallpaper,
        colors: theme.colors,
        icon: theme.icon,
        font: theme.font,
        clock: theme.clock,
        statusBar: theme.statusBar,
        navigation: theme.navigation,
        createdAt: theme.createdAt,
        updatedAt: theme.updatedAt,
        formatVersion: 1,
      },
      null,
      2
    );

  const exportPreviewImage = async () => {
    setBusy('preview');
    try {
      const dataUrl = await renderWallpaperToDataUrl(theme.wallpaper);
      downloadBlob(dataUrlToBlob(dataUrl), `${slug}-preview.png`);
      push('Preview image exported', 'success');
      onExported?.();
    } catch {
      push('Could not generate preview image', 'error');
    } finally {
      setBusy(null);
    }
  };

  const exportWallpaperFile = async () => {
    setBusy('wallpaper');
    try {
      const dataUrl = await renderWallpaperToDataUrl(theme.wallpaper);
      downloadBlob(dataUrlToBlob(dataUrl), `${slug}-wallpaper.png`);
      push('Wallpaper exported', 'success');
      onExported?.();
    } catch {
      push('Could not export wallpaper', 'error');
    } finally {
      setBusy(null);
    }
  };

  const exportConfig = () => {
    setBusy('config');
    const blob = new Blob([buildConfigJson()], { type: 'application/json' });
    downloadBlob(blob, `${slug}-config.json`);
    push('Theme configuration exported', 'success');
    onExported?.();
    setBusy(null);
  };

  const exportPackage = async () => {
    setBusy('package');
    try {
      const zip = new JSZip();
      const wallpaperDataUrl = await renderWallpaperToDataUrl(theme.wallpaper);
      zip.file('configuration.json', buildConfigJson());
      zip.file('wallpaper.png', dataUrlToBlob(wallpaperDataUrl));
      zip.file('preview.png', dataUrlToBlob(wallpaperDataUrl));
      zip.file(
        'metadata.json',
        JSON.stringify(
          {
            name: theme.name,
            description: theme.description,
            packagedAt: new Date().toISOString(),
            generator: 'Android Theme Maker',
            note: 'This ZIP contains theme assets and configuration only. It is not an installable APK or Android theme package.',
          },
          null,
          2
        )
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(blob, `${slug}-theme-package.zip`);
      push('Theme package exported', 'success');
      onExported?.();
    } catch {
      push('Could not build theme package', 'error');
    } finally {
      setBusy(null);
    }
  };

  const options = [
    { id: 'preview', label: 'Export Preview', desc: 'A rendered image of the wallpaper preview', icon: Image, action: exportPreviewImage },
    { id: 'wallpaper', label: 'Export Wallpaper', desc: 'PNG file of the current wallpaper', icon: Palette, action: exportWallpaperFile },
    { id: 'config', label: 'Export Theme Configuration', desc: 'JSON file with all theme settings', icon: FileJson, action: exportConfig },
    { id: 'package', label: 'Export Theme Package', desc: 'ZIP with wallpaper, config & metadata', icon: Package, action: exportPackage },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151a17] p-5 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Export Theme</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/80">
            <X size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={o.action}
              disabled={busy !== null}
              className="flex items-center gap-3 rounded-xl border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] transition p-3 text-left disabled:opacity-50"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-emerald-300 shrink-0">
                <o.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium">{o.label}</div>
                <div className="text-[11px] text-white/45">{o.desc}</div>
              </div>
              {busy === o.id && <div className="w-4 h-4 border-2 border-white/20 border-t-emerald-400 rounded-full animate-spin shrink-0" />}
            </button>
          ))}
        </div>
        <p className="text-[10.5px] text-white/35 leading-relaxed">
          Note: exported files are assets and configuration for this design tool. They are not an installable APK or Android system theme package.
        </p>
        <Button variant="ghost" size="md" fullWidth onClick={onClose} className="mt-3">
          Close
        </Button>
      </div>
    </div>
  );
}
