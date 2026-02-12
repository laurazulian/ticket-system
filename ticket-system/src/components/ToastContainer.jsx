// ========================================
// src/components/ToastContainer.jsx
// ========================================
import React from 'react';
import ToastNotification from './ToastNotification';

const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          {...toast}
          onCerrar={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;