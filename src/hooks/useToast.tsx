import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info';
interface ToastItem {
  id: string;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  push: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const remove = (id: string) => setItems((prev) => prev.filter((t) => t.id !== id));

  const icon = (kind: ToastKind) => {
    if (kind === 'success') return <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />;
    if (kind === 'error') return <XCircle size={18} className="text-red-400 shrink-0" />;
    return <Info size={18} className="text-sky-400 shrink-0" />;
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm sm:bottom-6 sm:right-6">
        {items.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151a17]/95 backdrop-blur px-4 py-3 shadow-lg shadow-black/30 text-sm text-white/90 animate-toast-in"
          >
            {icon(t.kind)}
            <span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="text-white/40 hover:text-white/80 transition">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
