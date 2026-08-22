import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ConfirmDialog, SectionLabel } from '../components/ui/Primitives';
import { Card } from '../components/ui/Primitives';
import { useToast } from '../hooks/useToast';
import { useThemes } from '../hooks/useThemes';
import clsx from 'clsx';

export function SettingsPage() {
  const navigate = useNavigate();
  const { push } = useToast();
  const { resetAll } = useThemes();
  const [autoSave, setAutoSave] = useState(true);
  const [layout, setLayout] = useState<'3-column' | 'focused'>('3-column');
  const [previewDevice, setPreviewDevice] = useState<'pixel' | 'compact' | 'tablet'>('pixel');
  const [language, setLanguage] = useState<'en' | 'id'>('id');
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
      <p className="text-white/40 text-sm mb-6">Configure how Android Theme Maker looks and behaves.</p>

      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <SectionLabel>Appearance</SectionLabel>
          <p className="text-xs text-white/45 mb-2">Use the moon/sun icon in the header to toggle dark or light mode anytime.</p>
        </Card>

        <Card className="p-5">
          <SectionLabel>Default editor layout</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {(['3-column', 'focused'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={clsx('text-xs py-2 rounded-lg border capitalize transition', layout === l ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25')}
              >
                {l === '3-column' ? 'Editor / Preview / Properties' : 'Preview focused'}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionLabel
            action={
              <label className="flex items-center gap-1.5 text-[11px] text-white/50 cursor-pointer">
                <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} className="accent-emerald-500" />
                Enabled
              </label>
            }
          >
            Auto save
          </SectionLabel>
          <p className="text-xs text-white/45">Automatically save your progress while editing a theme.</p>
        </Card>

        <Card className="p-5">
          <SectionLabel>Preview device</SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            {(['pixel', 'compact', 'tablet'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setPreviewDevice(d)}
                className={clsx('text-xs py-2 rounded-lg border capitalize transition', previewDevice === d ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25')}
              >
                {d}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionLabel>Language</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {(['id', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={clsx('text-xs py-2 rounded-lg border transition', language === l ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/55 hover:border-white/25')}
              >
                {l === 'id' ? 'Bahasa Indonesia' : 'English'}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 border-red-500/20">
          <SectionLabel>Reset application</SectionLabel>
          <p className="text-xs text-white/45 mb-3">Deletes all themes and restores demo data. This cannot be undone.</p>
          <Button variant="danger" size="md" onClick={() => setConfirmReset(true)}>Reset Application</Button>
        </Card>

        <Button variant="ghost" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset application?"
        description="All your themes will be deleted and replaced with demo data. This cannot be undone."
        confirmLabel="Reset"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAll();
          push('Application has been reset', 'success');
          setConfirmReset(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}
