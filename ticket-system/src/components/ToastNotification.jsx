// ========================================
// src/components/ToastNotification.jsx
// ========================================
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Eye } from 'lucide-react';

const ToastNotification = ({ 
  tipo = 'info', 
  mensaje, 
  onCerrar, 
  duracion = 5000,
  accion,
  ticketNumero 
}) => {
  useEffect(() => {
    if (duracion > 0) {
      const timer = setTimeout(() => {
        onCerrar();
      }, duracion);
      return () => clearTimeout(timer);
    }
  }, [duracion, onCerrar]);

  const configs = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900'
    }
  };

  const config = configs[tipo];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 min-w-[320px] max-w-md animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.textColor}`}>
            {mensaje}
          </p>
          
          {ticketNumero && (
            <p className="text-xs text-gray-600 mt-1">
              Ticket: <span className="font-semibold">{ticketNumero}</span>
            </p>
          )}

          {accion && (
            <button
              onClick={accion.onClick}
              className={`mt-2 text-sm font-medium ${config.iconColor} hover:underline flex items-center gap-1`}
            >
              <Eye className="w-4 h-4" />
              {accion.label}
            </button>
          )}
        </div>

        <button
          onClick={onCerrar}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;