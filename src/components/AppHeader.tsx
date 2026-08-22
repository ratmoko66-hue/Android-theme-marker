import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Settings, Plus, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { useEffect, useState } from 'react';

export function AppHeader({ onCreate }: { onCreate: () => void }) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => !document.documentElement.classList.contains('light'));

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('atm.appearance', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0b0f0c]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3.5">
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Smartphone size={16} className="text-emerald-950" />
          </div>
          <span className="font-bold text-white text-[15px] hidden xs:inline">Android Theme Maker</span>
        </Link>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} title="Toggle appearance">
          {dark ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} title="Settings">
          <Settings size={16} />
        </Button>
        <Button variant="primary" size="md" icon={<Plus size={15} />} onClick={onCreate}>
          <span className="hidden sm:inline">Create Theme</span>
        </Button>
      </div>
    </header>
  );
}
