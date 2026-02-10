// ========================================
// src/components/admin/AdminPanel.jsx
// ========================================
import React, { useState } from 'react';
import { Settings, Users, Target, BarChart3, FolderTree } from 'lucide-react';
import GestionUsuarios from './GestionUsuarios';
import AsignacionTickets from './AsignacionTickets';
import EstadisticasAdmin from './EstadisticasAdmin';
import ConfiguracionSLA from './ConfiguracionSLA';
import GestionProyectos from './GestionProyectos';

const AdminPanel = ({ 
  tickets, 
  usuarios, 
  proyectos,
  onActualizarTicket,
  onActualizarUsuario,
  onActualizarProyecto,
  usuarioActual
}) => {
  const [tabActiva, setTabActiva] = useState('asignacion');

  // Verificar permisos
  if (usuarioActual.rol !== 'admin') {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No tienes permisos para acceder a esta sección
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'asignacion', label: 'Asignación de Tickets', icon: Target },
    { id: 'usuarios', label: 'Gestión de Usuarios', icon: Users },
    { id: 'proyectos', label: 'Proyectos y Categorías', icon: FolderTree },
    { id: 'sla', label: 'Configuración SLA', icon: Settings },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Panel de Administración
        </h2>
        <p className="text-gray-600">
          Gestiona usuarios, tickets, configuraciones y estadísticas del sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTabActiva(tab.id)}
                  className={`group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                    tabActiva === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${
                    tabActiva === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {tabActiva === 'asignacion' && (
            <AsignacionTickets
              tickets={tickets}
              usuarios={usuarios}
              onActualizarTicket={onActualizarTicket}
            />
          )}
          
          {tabActiva === 'usuarios' && (
            <GestionUsuarios
              usuarios={usuarios}
              tickets={tickets}
              onActualizarUsuario={onActualizarUsuario}
            />
          )}

          {tabActiva === 'proyectos' && (
            <GestionProyectos
              proyectos={proyectos}
              onActualizarProyecto={onActualizarProyecto}
            />
          )}

          {tabActiva === 'sla' && (
            <ConfiguracionSLA
              proyectos={proyectos}
              onActualizarProyecto={onActualizarProyecto}
            />
          )}

          {tabActiva === 'estadisticas' && (
            <EstadisticasAdmin
              tickets={tickets}
              usuarios={usuarios}
              proyectos={proyectos}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;