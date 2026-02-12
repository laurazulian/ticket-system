// ========================================
// src/hooks/useToast.js
// ========================================
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ tipo = 'info', mensaje, duracion = 5000, accion, ticketNumero }) => {
    const id = Date.now();
    const newToast = {
      id,
      tipo,
      mensaje,
      duracion,
      accion,
      ticketNumero
    };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((mensaje, options = {}) => {
    return addToast({ tipo: 'success', mensaje, ...options });
  }, [addToast]);

  const error = useCallback((mensaje, options = {}) => {
    return addToast({ tipo: 'error', mensaje, ...options });
  }, [addToast]);

  const warning = useCallback((mensaje, options = {}) => {
    return addToast({ tipo: 'warning', mensaje, ...options });
  }, [addToast]);

  const info = useCallback((mensaje, options = {}) => {
    return addToast({ tipo: 'info', mensaje, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};