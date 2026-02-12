// ========================================
// src/components/layout/Header.jsx
// ========================================
import React from 'react';
import { Bell, Plus, UserCircle } from 'lucide-react';

const Header = ({ 
  usuarioActual, 
  usuarios, // Nueva prop
  onCambiarUsuario, // Nueva prop
  notificacionesNoLeidas,
  onMostrarNotificaciones,
  onNuevoTicket 
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Opcional: Icono de usuario para darle contexto al selector */}
            <UserCircle className="w-10 h-10 text-gray-400" />
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Sistema de Tickets
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">
                  Simular como:
                </p>
                <select 
                  className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1 cursor-pointer hover:bg-gray-100 transition-colors"
                  value={usuarioActual.id}
                  onChange={(e) => onCambiarUsuario(e.target.value)}
                >
                  {usuarios && usuarios.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.nombre} ({u.rol.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={onMostrarNotificaciones}
              className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors"
              title="Notificaciones"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notificacionesNoLeidas > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold border-2 border-white">
                  {notificacionesNoLeidas}
                </span>
              )}
            </button>
            
            <button 
              onClick={onNuevoTicket}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nuevo Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;