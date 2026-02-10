// ========================================
// src/components/admin/GestionProyectos.jsx
// ========================================
import React, { useState } from 'react';
import { FolderPlus, Edit2, Trash2, Tag } from 'lucide-react';

const GestionProyectos = ({ proyectos, onActualizarProyecto }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState(null);

  // Si no hay proyectos, usar datos de ejemplo
  const proyectosData = proyectos || [
    { id: 1, codigo: 'TELECOM', nombre: 'Telecomunicaciones', area: 'TELECOM', estado: 'ACTIVO', color: '#3b82f6' },
    { id: 2, codigo: 'INFRA', nombre: 'Infraestructura IT', area: 'INFRA', estado: 'ACTIVO', color: '#f97316' },
    { id: 3, codigo: 'DEV', nombre: 'Desarrollo', area: 'DESARROLLO', estado: 'ACTIVO', color: '#10b981' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Gestión de Proyectos</h3>
          <p className="text-sm text-gray-600 mt-1">
            Administra proyectos, áreas y categorías del sistema
          </p>
        </div>
        <button
          onClick={() => {
            setProyectoEditando(null);
            setMostrarModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          Nuevo Proyecto
        </button>
      </div>

      {/* Lista de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectosData.map(proyecto => (
          <div 
            key={proyecto.id} 
            className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header con color */}
            <div 
              className="h-2" 
              style={{ backgroundColor: proyecto.color }}
            ></div>

            <div className="p-6">
              {/* Título y acciones */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {proyecto.nombre}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Código: {proyecto.codigo}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setProyectoEditando(proyecto);
                      setMostrarModal(true);
                    }}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Estado */}
              <div className="mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  proyecto.estado === 'ACTIVO' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {proyecto.estado}
                </span>
              </div>

              {/* Categorías */}
              <div>
                <p className="text-xs text-gray-600 mb-2">Categorías:</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Red de Datos
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Enlaces
                  </span>
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-600">Tickets Activos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-600">Categorías</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categorías Globales */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Categorías Globales</h3>
        <p className="text-sm text-gray-600 mb-4">
          Categorías que se pueden usar en todos los proyectos
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Hardware', 'Software', 'Red', 'Base de Datos', 'Seguridad', 'Cloud', 'Email', 'Backup'].map(cat => (
            <div key={cat} className="border rounded p-3 hover:border-blue-500 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{cat}</span>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Agregar Categoría Global
        </button>
      </div>

      {/* Modal simplificado */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {proyectoEditando ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Funcionalidad de edición/creación de proyectos (implementar formulario completo)
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

export default GestionProyectos;