# Android Theme Maker (Phase 1)

A web app for visually creating and customizing Android themes — wallpaper, colors, icons, fonts, clock, and system bars — with a live phone preview, built with React + TypeScript + Vite + Tailwind CSS.

## What's implemented (Phase 1 of the original spec)

- **Dashboard**: stats (total/draft/exported/favorite), quick actions, recent themes
- **Theme Editor**: 3-column layout on desktop (section nav / live preview / properties), bottom-sheet on mobile
- **Live Android Preview**: Lock Screen, Home Screen (widgets, app grid, folder, dock, nav bar), Notification Panel — all update in real time
- **Wallpaper Editor**: upload, drag & drop, 16 built-in gradients across 8 categories, blur/brightness/contrast/saturation, gradient overlay
- **Color Customizer**: 9 adjustable colors, 8 presets, "Generate Palette" (harmonious random HSL palette)
- **Icon Customizer**: 6 shapes × 6 styles, size/radius/shadow, live sample apps
- **Font Customizer**: 5 font families, size & weight, live preview
- **Clock Designer**: 7 clock designs, alignment, size, color
- **System Bars**: status bar & navigation bar color/transparency/style
- **Theme Templates**: 6 ready-made templates (Islamic Green, AMOLED, Material You, Elegant Gold, Nature, Minimal White) — Use Template → Editor
- **Save/Duplicate/Delete/Favorite/Export** on every theme, with confirm dialogs and toasts
- **Export**: preview PNG, wallpaper PNG, theme configuration JSON, and a ZIP theme package (wallpaper + config + metadata) — clearly labeled as *not* an installable APK
- **Import**: JSON theme, ZIP theme package, or image wallpaper, with validation and error messages
- **My Themes**: grid/list view, search, filter (All/Favorite/Draft/Exported)
- **Settings**: layout, auto-save toggle, preview device, language, reset app
- **Undo/redo**, autosave, and demo data seeded on first run (5 themes) so the app never looks empty
- **Dark/light mode** toggle, responsive down to mobile, PWA manifest included

Data is stored in `localStorage` through a repository layer (`src/services/themeStorage.ts`) that's structured so it can be swapped for Supabase later without touching any UI component.

## Not yet built (Phase 2 / Phase 3 from the original spec)

Widget Builder (drag & drop widgets beyond the fixed clock widget), Folder Customizer (deeper controls), rule-based/AI Theme Generator from a text prompt, and a real Supabase-backed persistence layer. The architecture (services/hooks/types/components separated) is set up to make adding these straightforward.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    dashboard/   # ThemeCard, StatCard, ImportDialog
    editor/      # ThemeEditor shell + all customizer panels, ExportDialog
    preview/     # PhoneFrame, LockScreen/HomeScreen/NotificationPanel, AppIcon, ClockDisplay
    ui/          # Button, Card, ConfirmDialog, EmptyState, SliderField, ColorField
  hooks/         # useThemes, useToast
  pages/         # Dashboard, MyThemes, Editor, Templates, Wallpapers, Icons, Settings
  services/      # themeStorage.ts (localStorage repository, Supabase-ready)
  types/         # theme.ts
  utils/         # presets, themeFactory, demoData, wallpaperCss, exportWallpaper
```
