// ========================================
// src/components/admin/ConfiguracionSLA.jsx
// ========================================
import React, { useState } from 'react';
import { Clock, Save, AlertCircle } from 'lucide-react';
import { PRIORIDADES } from '../../utils/constants';

const ConfiguracionSLA = ({ proyectos, onActualizarProyecto }) => {
  const [configuracionSLA, setConfiguracionSLA] = useState({
    'Crítica': 4,
    'Alta': 24,
    'Media': 72,
    'Baja': 168
  });

  const [guardarExitoso, setGuardarExitoso] = useState(false);

  const handleGuardar = () => {
    // Aquí guardarías la configuración
    console.log('Guardando configuración SLA:', configuracionSLA);
    setGuardarExitoso(true);
    setTimeout(() => setGuardarExitoso(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Descripción */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Configuración de Acuerdos de Nivel de Servicio (SLA)
            </h4>
            <p className="text-sm text-blue-800">
              Define los tiempos de respuesta para cada nivel de prioridad. 
              Los valores se expresan en horas y se aplican a todos los tickets nuevos.
            </p>
          </div>
        </div>
      </div>

      {/* Configuración Global */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Tiempos SLA por Prioridad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIORIDADES.map(prioridad => (
            <div key={prioridad} className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Prioridad: {prioridad}
              </label>
              
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={configuracionSLA[prioridad]}
                  onChange={(e) => setConfiguracionSLA({
                    ...configuracionSLA,
                    [prioridad]: parseInt(e.target.value)
                  })}
                  className="w-32 border border-gray-300 rounded-lg px-4 py-2 text-lg font-semibold focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600">horas</span>
              </div>

              {/* Equivalencia en días */}
              <p className="text-sm text-gray-500 mt-2">
                Equivale a {(configuracionSLA[prioridad] / 24).toFixed(1)} días
              </p>

              {/* Ejemplo visual */}
              <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Ejemplo:</p>
                <p className="text-xs text-gray-700">
                  Ticket creado: Hoy 10:00<br />
                  Debe resolverse antes: {
                    new Date(Date.now() + configuracionSLA[prioridad] * 60 * 60 * 1000)
                      .toLocaleString('es-AR', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de guardar */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              guardarExitoso 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Save className="w-4 h-4" />
            {guardarExitoso ? 'Guardado ✓' : 'Guardar Configuración'}
          </button>
        </div>
      </div>

      {/* Configuración por Proyecto (Opcional) */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Configuración Personalizada por Proyecto
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Opcionalmente, puedes definir SLAs específicos para cada proyecto
        </p>

        <div className="space-y-4">
          {proyectos && proyectos.map(proyecto => (
            <div key={proyecto.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{proyecto.nombre}</h4>
                  <p className="text-sm text-gray-600">{proyecto.area}</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Configurar SLA →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas y Notificaciones */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Alertas de Vencimiento
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-700">
              Notificar cuando falten 25% del tiempo SLA
            </span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-700">
              Notificar cuando falten 10% del tiempo SLA
            </span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-700">
              Notificar inmediatamente cuando se venza el SLA
            </span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700">
              Escalar automáticamente tickets vencidos al supervisor
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSLA;
