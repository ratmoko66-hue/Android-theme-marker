import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Theme } from '../types/theme';
import { themeRepository } from '../services/themeStorage';
import { ThemeEditor } from '../components/editor/ThemeEditor';
import { EmptyState, Loading } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { AlertCircle } from 'lucide-react';

export function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setTheme(themeRepository.get(id) ?? null);
  }, [id]);

  if (theme === undefined) return <Loading label="Loading theme..." />;

  if (theme === null) {
    return (
      <div className="max-w-lg mx-auto py-20 px-4">
        <EmptyState
          icon={<AlertCircle size={22} />}
          title="Theme not found"
          description="This theme may have been deleted or the link is invalid."
          action={<Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>}
        />
      </div>
    );
  }

  return (
    <ThemeEditor
      initial={theme}
      onSave={(themeId, patch) => {
        themeRepository.update(themeId, patch);
      }}
      onExported={(themeId) => {
        themeRepository.markExported(themeId);
      }}
    />
  );
}
