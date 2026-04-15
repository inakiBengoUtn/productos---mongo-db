/* Shared types and context for the toast system */
import { createContext } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
