import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import type { ToastType } from "./toastContext";
import { ToastContext } from "./toastContext";
import "./ToastProvider.css";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error:   <XCircle    size={18} />,
  warning: <AlertTriangle size={18} />,
  info:    <Info       size={18} />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev.slice(-4), { id, type, message, duration }]);
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  const ctx = {
    toast,
    success: (m: string) => toast(m, "success"),
    error:   (m: string) => toast(m, "error", 6000),
    warning: (m: string) => toast(m, "warning", 5000),
    info:    (m: string) => toast(m, "info"),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="toast-container" role="region" aria-label="Notificaciones" aria-live="polite">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`toast toast--${t.type}`}
              role="alert"
            >
              <span className="toast-icon">{ICONS[t.type]}</span>
              <span className="toast-message">{t.message}</span>
              <button
                className="toast-close"
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar notificación"
              >
                <X size={14} />
              </button>
              <motion.div
                className="toast-progress"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: (t.duration ?? 4000) / 1000, ease: "linear" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
