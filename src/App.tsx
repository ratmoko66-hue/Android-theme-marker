import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { DashboardPage } from './pages/DashboardPage';
import { MyThemesPage } from './pages/MyThemesPage';
import { EditorPage } from './pages/EditorPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { WallpapersPage } from './pages/WallpapersPage';
import { IconsPage } from './pages/IconsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToastProvider } from './hooks/useToast';
import { useThemes } from './hooks/useThemes';
import { createDefaultThemeInput } from './utils/themeFactory';

function ShellLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { createTheme } = useThemes();

  const handleCreate = () => {
    const theme = createTheme(createDefaultThemeInput('Untitled Theme'));
    navigate(`/editor/${theme.id}`);
  };

  return (
    <div className="min-h-screen">
      <AppHeader onCreate={handleCreate} />
      {children}
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/editor/');

  if (isEditor) {
    return (
      <Routes>
        <Route path="/editor/:id" element={<EditorPage />} />
      </Routes>
    );
  }

  return (
    <ShellLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/themes" element={<MyThemesPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/wallpapers" element={<WallpapersPage />} />
        <Route path="/icons" element={<IconsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ShellLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
