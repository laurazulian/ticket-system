// ========================================
// src/components/PanelNotificaciones.jsx
// ========================================
import React from 'react';
import { X } from 'lucide-react';

const PanelNotificaciones = ({ 
  mostrar, 
  notificaciones, 
  onCerrar, 
  onLimpiar,
  onMarcarLeida 
}) => {
  if (!mostrar) return null;

  return (
    <div className="fixed right-4 top-20 bg-white rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto z-50 border">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50 sticky top-0">
        <h3 className="font-semibold text-gray-900">Notificaciones</h3>
        <button 
          onClick={onCerrar}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="divide-y">
        {notificaciones.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm">No hay notificaciones</p>
          </div>
        ) : (
          notificaciones.slice(0, 20).map(notif => (
            <div 
              key={notif.id} 
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !notif.leida ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => onMarcarLeida && onMarcarLeida(notif.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notif.mensaje}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.fecha).toLocaleString('es-AR')}
                  </p>
                </div>
                {!notif.leida && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {notificaciones.length > 0 && (
        <div className="p-4 border-t bg-gray-50 sticky bottom-0">
          <button 
            onClick={onLimpiar}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpiar todas
          </button>
        </div>
      )}
    </div>
  );
};

export default PanelNotificaciones;