import React from 'react';
import { Bell, Plus } from 'lucide-react';

const Header = ({ 
  usuarioActual, 
  notificacionesNoLeidas,
  onMostrarNotificaciones,
  onNuevoTicket 
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Tickets
            </h1>
            <p className="text-sm text-gray-600">
              Usuario: {usuarioActual.nombre} ({usuarioActual.rol})
            </p>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={onMostrarNotificaciones}
              className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notificacionesNoLeidas > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {notificacionesNoLeidas}
                </span>
              )}
            </button>
            
            <button 
              onClick={onNuevoTicket}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nuevo Ticket
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
