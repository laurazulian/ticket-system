// ========================================
// src/components/admin/GestionUsuarios.jsx
// ========================================
import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, Award, TrendingUp, Clock } from 'lucide-react';

const GestionUsuarios = ({ usuarios, tickets, onActualizarUsuario }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Calcular estadísticas por usuario
  const usuariosConStats = usuarios.map(usuario => {
    const ticketsUsuario = tickets.filter(t => t.asignadoA === usuario.nombre);
    const ticketsResueltos = ticketsUsuario.filter(t => t.estado === 'Resuelto').length;
    const ticketsPendientes = ticketsUsuario.filter(t => !['Resuelto', 'Cerrado'].includes(t.estado)).length;
    const slaCumplidos = ticketsUsuario.filter(t => t.sla_cumplido === 'S').length;
    const slaTotal = ticketsUsuario.filter(t => t.sla_cumplido).length;
    const tasaSLA = slaTotal > 0 ? ((slaCumplidos / slaTotal) * 100).toFixed(1) : 0;

    return {
      ...usuario,
      stats: {
        total: ticketsUsuario.length,
        resueltos: ticketsResueltos,
        pendientes: ticketsPendientes,
        tasaSLA,
        promedioResolucion: 0 // Calcularlo si tienes fechas
      }
    };
  });

  return (
    <div className="space-y-6">
      {/* Header con botón de agregar */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h3>
          <p className="text-sm text-gray-600 mt-1">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>
        <button
          onClick={() => {
            setUsuarioEditando(null);
            setMostrarModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Grid de Usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuariosConStats.map(usuario => (
          <div key={usuario.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
            {/* Header de la tarjeta */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {usuario.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{usuario.nombre}</h4>
                  <p className="text-sm text-gray-500">{usuario.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setUsuarioEditando(usuario);
                    setMostrarModal(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rol y Estado */}
            <div className="flex gap-2 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                usuario.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                usuario.rol === 'tecnico' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {usuario.rol === 'admin' ? 'Administrador' : 
                 usuario.rol === 'tecnico' ? 'Técnico' : 'Usuario'}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                usuario.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {usuario.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            {/* Estadísticas */}
            {usuario.rol === 'tecnico' && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tickets Activos</span>
                  <span className="font-semibold text-gray-900">{usuario.stats.pendientes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Resueltos</span>
                  <span className="font-semibold text-green-600">{usuario.stats.resueltos}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cumplimiento SLA</span>
                  <span className={`font-semibold ${
                    usuario.stats.tasaSLA >= 90 ? 'text-green-600' :
                    usuario.stats.tasaSLA >= 70 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {usuario.stats.tasaSLA}%
                  </span>
                </div>

                {/* Indicador de desempeño */}
                {usuario.stats.tasaSLA >= 95 && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-yellow-700 font-medium">
                      Alto desempeño
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Áreas asignadas */}
            {usuario.areas && usuario.areas.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-600 mb-2">Áreas asignadas:</p>
                <div className="flex gap-2 flex-wrap">
                  {usuario.areas.map(area => (
                    <span key={area} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumen General */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Resumen del Equipo</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Usuarios</p>
            <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Técnicos Activos</p>
            <p className="text-2xl font-bold text-blue-600">
              {usuarios.filter(u => u.rol === 'tecnico' && u.activo).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Administradores</p>
            <p className="text-2xl font-bold text-purple-600">
              {usuarios.filter(u => u.rol === 'admin').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">SLA Promedio</p>
            <p className="text-2xl font-bold text-green-600">
              {(usuariosConStats
                .filter(u => u.rol === 'tecnico')
                .reduce((acc, u) => acc + parseFloat(u.stats.tasaSLA), 0) / 
                usuarios.filter(u => u.rol === 'tecnico').length || 0
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Modal (simplificado - crear componente completo si es necesario) */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Funcionalidad de edición/creación de usuarios (implementar formulario completo)
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;