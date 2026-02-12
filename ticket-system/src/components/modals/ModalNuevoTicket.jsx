// ========================================
// src/components/modals/ModalNuevoTicket.jsx
// ========================================
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PRIORIDADES, TECNICOS, TIPOS, AMBIENTES } from '../../utils/constants';

const ModalNuevoTicket = ({ mostrar, onCerrar, onCrear, onVerTicket }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    area: 'TELECOM',
    prioridad: 'Media',
    tipo: 'Incidente',
    estado: 'Nuevo',
    asignadoA: '',
    ambiente: 'PRODUCCION',
    categoria: '',
    tags: ''
  });

  const [errores, setErrores] = useState({});
  const [ticketCreado, setTicketCreado] = useState(null);

  if (!mostrar) return null;

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    }
    
    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    if (!validarFormulario()) {
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t);
    
    const nuevoTicket = onCrear({
      ...formData,
      tags: tagsArray
    });

    // Guardar ticket creado para mostrar opciones
    setTicketCreado(nuevoTicket);
  };

  const handleCerrarYVer = () => {
    if (ticketCreado) {
      onVerTicket(ticketCreado);
    }
    resetearFormulario();
    onCerrar();
  };

  const handleCerrarSinVer = () => {
    resetearFormulario();
    onCerrar();
  };

  const resetearFormulario = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      area: 'TELECOM',
      prioridad: 'Media',
      tipo: 'Incidente',
      estado: 'Nuevo',
      asignadoA: '',
      ambiente: 'PRODUCCION',
      categoria: '',
      tags: ''
    });
    setErrores({});
    setTicketCreado(null);
  };

  const handleChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: null });
    }
  };

  // Si el ticket fue creado, mostrar mensaje de éxito
  if (ticketCreado) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Ticket Creado Exitosamente!
          </h2>
          
          <p className="text-gray-600 mb-4">
            Se ha creado el ticket <span className="font-semibold text-blue-600">{ticketCreado.numero}</span>
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Título:</span> {ticketCreado.titulo}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Prioridad:</span> {ticketCreado.prioridad}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Asignado a:</span> {ticketCreado.asignadoA || 'Sin asignar'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleCerrarYVer}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Ver Ticket Creado
            </button>
            <button
              onClick={handleCerrarSinVer}
              className="w-full border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Nuevo Ticket</h2>
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
              Título *
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errores.titulo ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              placeholder="Ej: Error en servidor de aplicaciones"
            />
            {errores.titulo && (
              <p className="text-red-500 text-sm mt-1">{errores.titulo}</p>
            )}
          </div>

          {/* Área, Tipo y Prioridad */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
              >
                <option value="TELECOM">Telecomunicaciones</option>
                <option value="INFRA">Infraestructura</option>
                <option value="DESARROLLO">Desarrollo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.tipo}
                onChange={(e) => handleChange('tipo', e.target.value)}
              >
                {TIPOS.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.prioridad}
                onChange={(e) => handleChange('prioridad', e.target.value)}
              >
                {PRIORIDADES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Asignar y Ambiente */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asignar a
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.asignadoA}
                onChange={(e) => handleChange('asignadoA', e.target.value)}
              >
                <option value="">Sin asignar</option>
                {TECNICOS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ambiente
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.ambiente}
                onChange={(e) => handleChange('ambiente', e.target.value)}
              >
                {AMBIENTES.map(amb => (
                  <option key={amb} value={amb}>{amb}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (separados por comas)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="urgente, red, critico"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Ejemplo: urgente, red, servidor
            </p>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errores.descripcion ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="5"
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              placeholder="Describe el problema o solicitud..."
            ></textarea>
            {errores.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
            )}
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNuevoTicket;