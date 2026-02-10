// ========================================
// src/components/modals/ModalEdicion.jsx
// ========================================
import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ESTADOS, PRIORIDADES, TECNICOS } from '../../utils/constants';

const ModalEdicion = ({ mostrar, ticket, onCerrar, onGuardar }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (ticket) {
      setFormData({ ...ticket });
    }
  }, [ticket]);

  if (!mostrar || !ticket) return null;

  const handleSubmit = () => {
    onGuardar(formData.id, formData);
  };

  const handleChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Editar Ticket</h2>
            <p className="text-sm text-gray-600 mt-1">{formData.numero}</p>
          </div>
          <button 
            onClick={onCerrar}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.titulo || ''}
              onChange={(e) => handleChange('titulo', e.target.value)}
            />
          </div>

          {/* Estado, Prioridad y Progreso */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.estado || ''}
                onChange={(e) => handleChange('estado', e.target.value)}
              >
                {ESTADOS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.prioridad || ''}
                onChange={(e) => handleChange('prioridad', e.target.value)}
              >
                {PRIORIDADES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progreso (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.progreso || 0}
                onChange={(e) => handleChange('progreso', parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Asignado a */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asignado a
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.asignadoA || ''}
              onChange={(e) => handleChange('asignadoA', e.target.value)}
            >
              <option value="">Sin asignar</option>
              {TECNICOS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Barra de progreso visual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progreso Visual
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              className="w-full"
              value={formData.progreso || 0}
              onChange={(e) => handleChange('progreso', parseInt(e.target.value))}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="font-medium text-gray-700">{formData.progreso || 0}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              value={formData.descripcion || ''}
              onChange={(e) => handleChange('descripcion', e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
          <button 
            onClick={onCerrar}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdicion;