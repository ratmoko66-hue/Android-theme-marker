import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { X, Upload, FileJson, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { themeRepository } from '../../services/themeStorage';
import { hydrateTheme, createDefaultThemeInput } from '../../utils/themeFactory';
import type { ThemeInput } from '../../types/theme';

function isValidThemeInput(obj: unknown): obj is Partial<ThemeInput> & { name?: string } {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return 'colors' in o || 'wallpaper' in o || 'name' in o;
}

export function ImportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { push } = useToast();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const finishImport = (partial: Partial<ThemeInput> & { name?: string }) => {
    const base = createDefaultThemeInput(partial.name ?? 'Imported Theme');
    const merged: ThemeInput = {
      ...base,
      ...partial,
      name: partial.name ?? base.name,
      status: 'draft',
      favorite: false,
    } as ThemeInput;
    const theme = hydrateTheme(merged);
    themeRepository.insert(theme);
    push('Theme imported successfully', 'success');
    onClose();
    navigate(`/editor/${theme.id}`);
  };

  const handleFile = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      if (file.size > 15 * 1024 * 1024) {
        throw new Error('File is too large (max 15MB).');
      }

      if (file.name.endsWith('.json') || file.type === 'application/json') {
        const text = await file.text();
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          throw new Error('This JSON file is not formatted correctly.');
        }
        if (!isValidThemeInput(parsed)) {
          throw new Error('This JSON file does not look like a valid theme configuration.');
        }
        finishImport(parsed);
        return;
      }

      if (file.name.endsWith('.zip')) {
        const zip = await JSZip.loadAsync(file);
        const configFile = zip.file('configuration.json');
        if (!configFile) {
          throw new Error('This ZIP does not contain a configuration.json file.');
        }
        const text = await configFile.async('string');
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          throw new Error('The configuration inside this ZIP is invalid.');
        }
        if (!isValidThemeInput(parsed)) {
          throw new Error('The configuration inside this ZIP is not a valid theme.');
        }
        finishImport(parsed);
        return;
      }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            finishImport({
              name: file.name.replace(/\.[^.]+$/, '') || 'Imported Wallpaper',
              wallpaper: { source: reader.result, type: 'image', blur: 0, brightness: 100, contrast: 100, saturation: 100, overlay: false, overlayOpacity: 30 },
            });
          }
        };
        reader.onerror = () => setError('Could not read this image file.');
        reader.readAsDataURL(file);
        return;
      }

      throw new Error('Unsupported file type. Please upload a .json theme, .zip package, or image wallpaper.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while importing this file.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151a17] p-5 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Import</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/80">
            <X size={16} />
          </button>
        </div>

        <div
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-8 cursor-pointer hover:border-emerald-500/40 hover:bg-white/[0.02] transition mb-3"
        >
          {busy ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-emerald-400 rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={20} className="text-white/40" />
              <span className="text-xs text-white/55 text-center px-4">
                Drop a JSON theme, .zip theme package, or wallpaper image here
              </span>
            </>
          )}
          <input
            ref={fileInput}
            type="file"
            accept=".json,.zip,image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-[12px] text-red-300 mb-3">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[10.5px] text-white/35 mb-4">
          <FileJson size={12} />
          Supported: .json theme configuration, .zip theme package, .png/.jpg wallpaper
        </div>

        <Button variant="ghost" size="md" fullWidth onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
