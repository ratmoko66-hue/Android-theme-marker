import { useCallback, useEffect, useState } from 'react';
import type { Theme, ThemeInput } from '../types/theme';
import { themeRepository } from '../services/themeStorage';
import { buildDemoThemes } from '../utils/demoData';

export function useThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setThemes(themeRepository.list());
  }, []);

  useEffect(() => {
    themeRepository.seedIfEmpty(buildDemoThemes());
    refresh();
    setLoading(false);
  }, [refresh]);

  const createTheme = useCallback((input: ThemeInput) => {
    const theme = themeRepository.create(input);
    refresh();
    return theme;
  }, [refresh]);

  const updateTheme = useCallback((id: string, patch: Partial<ThemeInput>) => {
    const theme = themeRepository.update(id, patch);
    refresh();
    return theme;
  }, [refresh]);

  const duplicateTheme = useCallback((id: string) => {
    const theme = themeRepository.duplicate(id);
    refresh();
    return theme;
  }, [refresh]);

  const deleteTheme = useCallback((id: string) => {
    themeRepository.delete(id);
    refresh();
  }, [refresh]);

  const toggleFavorite = useCallback((id: string) => {
    themeRepository.toggleFavorite(id);
    refresh();
  }, [refresh]);

  const markExported = useCallback((id: string) => {
    themeRepository.markExported(id);
    refresh();
  }, [refresh]);

  const resetAll = useCallback(() => {
    themeRepository.resetAll();
    themeRepository.seedIfEmpty(buildDemoThemes());
    refresh();
  }, [refresh]);

  return {
    themes,
    loading,
    createTheme,
    updateTheme,
    duplicateTheme,
    deleteTheme,
    toggleFavorite,
    markExported,
    resetAll,
    refresh,
  };
}
