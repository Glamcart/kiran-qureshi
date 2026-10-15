import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Check, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div 
        role="region" 
        aria-label="Notifications" 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-[#2E1738] text-[#FFF9F4] border-[#A62970]/30'
                : toast.type === 'error'
                ? 'bg-[#B42335] text-white border-red-700'
                : 'bg-white text-[#242026] border-[#EDE2E9]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <Check className="w-4 h-4 text-[#D7B77A] shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#A62970] shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
