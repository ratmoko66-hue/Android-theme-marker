import type { Theme, ThemeInput } from '../types/theme';
import { generateId } from '../utils/themeFactory';

const STORAGE_KEY = 'atm.themes.v1';

/**
 * Repository layer for theme persistence.
 * Backed by localStorage today; swap the implementation body for
 * Supabase calls later without touching any UI component.
 */
class ThemeRepository {
  private read(): Theme[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Theme[];
    } catch {
      return [];
    }
  }

  private write(themes: Theme[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
  }

  list(): Theme[] {
    return this.read().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }

  get(id: string): Theme | undefined {
    return this.read().find((t) => t.id === id);
  }

  create(input: ThemeInput): Theme {
    const now = new Date().toISOString();
    const theme: Theme = { ...input, id: generateId(), createdAt: now, updatedAt: now };
    const themes = this.read();
    themes.push(theme);
    this.write(themes);
    return theme;
  }

  /** Insert an already-hydrated theme as-is (used for demo seed / import). */
  insert(theme: Theme): Theme {
    const themes = this.read();
    themes.push(theme);
    this.write(themes);
    return theme;
  }

  update(id: string, patch: Partial<ThemeInput>): Theme | undefined {
    const themes = this.read();
    const idx = themes.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const updated: Theme = { ...themes[idx], ...patch, updatedAt: new Date().toISOString() };
    themes[idx] = updated;
    this.write(themes);
    return updated;
  }

  duplicate(id: string): Theme | undefined {
    const source = this.get(id);
    if (!source) return undefined;
    const now = new Date().toISOString();
    const copy: Theme = {
      ...source,
      id: generateId(),
      name: `${source.name} (Copy)`,
      status: 'draft',
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };
    const themes = this.read();
    themes.push(copy);
    this.write(themes);
    return copy;
  }

  delete(id: string): void {
    const themes = this.read().filter((t) => t.id !== id);
    this.write(themes);
  }

  toggleFavorite(id: string): Theme | undefined {
    const theme = this.get(id);
    if (!theme) return undefined;
    return this.update(id, { favorite: !theme.favorite });
  }

  markExported(id: string): Theme | undefined {
    return this.update(id, { status: 'exported' });
  }

  seedIfEmpty(demoThemes: Theme[]): void {
    const existing = this.read();
    if (existing.length > 0) return;
    this.write(demoThemes);
  }

  resetAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const themeRepository = new ThemeRepository();
