// ========================================
// src/components/modals/ModalCambiosMasivos.jsx
// ========================================
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { ESTADOS, PRIORIDADES, TECNICOS } from '../../utils/constants';

const ModalCambiosMasivos = ({ mostrar, ticketsSeleccionados, onCerrar, onAplicar }) => {
  const [cambios, setCambios] = useState({
    estado: '',
    prioridad: '',
    asignadoA: ''
  });

  if (!mostrar) return null;

  const handleSubmit = () => {
    // Filtrar solo los cambios que tienen valor
    const cambiosValidos = {};
    if (cambios.estado) cambiosValidos.estado = cambios.estado;
    if (cambios.prioridad) cambiosValidos.prioridad = cambios.prioridad;
    if (cambios.asignadoA) cambiosValidos.asignadoA = cambios.asignadoA;

    if (Object.keys(cambiosValidos).length === 0) {
      alert('Selecciona al menos un cambio para aplicar');
      return;
    }

    onAplicar(cambiosValidos);
    
    // Resetear formulario
    setCambios({
      estado: '',
      prioridad: '',
      asignadoA: ''
    });
  };

  const handleClose = () => {
    setCambios({
      estado: '',
      prioridad: '',
      asignadoA: ''
    });
    onCerrar();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cambios Masivos</h2>
            <p className="text-sm text-gray-600 mt-1">
              {ticketsSeleccionados.length} ticket{ticketsSeleccionados.length !== 1 ? 's' : ''} seleccionado{ticketsSeleccionados.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Selecciona los campos que deseas modificar en todos los tickets seleccionados.
          </p>

          {/* Cambiar Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cambiar Estado
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={cambios.estado}
              onChange={(e) => setCambios({ ...cambios, estado: e.target.value })}
            >
              <option value="">-- No cambiar --</option>
              {ESTADOS.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          {/* Cambiar Prioridad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cambiar Prioridad
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={cambios.prioridad}
              onChange={(e) => setCambios({ ...cambios, prioridad: e.target.value })}
            >
              <option value="">-- No cambiar --</option>
              {PRIORIDADES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Reasignar a */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reasignar a
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={cambios.asignadoA}
              onChange={(e) => setCambios({ ...cambios, asignadoA: e.target.value })}
            >
              <option value="">-- No cambiar --</option>
              {TECNICOS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Resumen de cambios */}
          {(cambios.estado || cambios.prioridad || cambios.asignadoA) && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Cambios a aplicar:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                {cambios.estado && <li>• Estado → {cambios.estado}</li>}
                {cambios.prioridad && <li>• Prioridad → {cambios.prioridad}</li>}
                {cambios.asignadoA && <li>• Asignado a → {cambios.asignadoA}</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button 
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Aplicar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCambiosMasivos;