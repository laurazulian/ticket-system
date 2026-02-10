// ========================================
// src/components/DetalleTicket.jsx
// ========================================
import React from 'react';
import { X, Edit2, Clock, MessageSquare, Paperclip, Tag } from 'lucide-react';
import { getEstadoColor, getPrioridadColor, getSlaColor } from '../utils/helpers';

const DetalleTicket = ({ ticket, onVolver, onEditar }) => {
  if (!ticket) return null;

  return (
    <div className="space-y-6">
      {/* Información Principal */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {ticket.numero}
            </h2>
            <p className="text-gray-600 mt-1">{ticket.titulo}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEditar(ticket)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
            <button 
              onClick={onVolver}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Estado, Prioridad y Progreso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Estado
            </label>
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getEstadoColor(ticket.estado)}`}>
              {ticket.estado}
            </span>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Prioridad
            </label>
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getPrioridadColor(ticket.prioridad)}`}>
              {ticket.prioridad}
            </span>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Progreso
            </label>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${ticket.progreso}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                {ticket.progreso}%
              </span>
            </div>
          </div>
        </div>

        {/* Detalles del Ticket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <DetailField label="Proyecto / Área" value={`${ticket.area}`} />
            <DetailField label="Categoría" value={ticket.categoria} />
            <DetailField label="Tipo" value={ticket.tipo} />
            <DetailField label="Ambiente" value={ticket.ambiente} />
          </div>

          <div className="space-y-4">
            <DetailField label="Reportado por" value={ticket.reportadoPor} />
            <DetailField label="Asignado a" value={ticket.asignadoA || 'Sin asignar'} />
            <DetailField 
              label="Fecha de reporte" 
              value={new Date(ticket.fechaReporte).toLocaleString('es-AR')} 
            />
            <DetailField 
              label="Vencimiento SLA" 
              value={
                <span className={getSlaColor(ticket.slaHoras)}>
                  {ticket.fechaVencimiento 
                    ? new Date(ticket.fechaVencimiento).toLocaleString('es-AR')
                    : 'No definido'
                  }
                  {ticket.slaHoras < 0 && ' (VENCIDO)'}
                </span>
              }
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="border-t pt-6">
          <label className="text-sm font-medium text-gray-600 block mb-2">
            Descripción
          </label>
          <p className="text-gray-700 whitespace-pre-wrap">
            {ticket.descripcion}
          </p>
        </div>

        {/* Tags */}
        {ticket.tags && ticket.tags.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Tags
            </label>
            <div className="flex gap-2 flex-wrap">
              {ticket.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <Tag className="w-4 h-4 text-gray-600" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="flex gap-6 mt-6 pt-6 border-t text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {ticket.timeline ? ticket.timeline.length : 0} actividades
          </div>
          <div className="flex items-center gap-2">
            <Paperclip className="w-4 h-4" />
            0 adjuntos
          </div>
        </div>
      </div>

      {/* Timeline de Actividad */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <Clock className="w-5 h-5 text-gray-600" />
          Timeline de Actividad
        </h3>
        
        {ticket.timeline && ticket.timeline.length > 0 ? (
          <div className="space-y-4">
            {ticket.timeline.map((evento, idx) => (
              <TimelineItem 
                key={idx} 
                evento={evento} 
                isLast={idx === ticket.timeline.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No hay actividad registrada</p>
        )}
      </div>

      {/* Sección de Comentarios */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-4 text-gray-900">Comentarios</h3>
        
        <div className="space-y-4 mb-6">
          <div className="border-l-2 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-900">
                {ticket.asignadoA || 'Usuario'}
              </span>
              <span className="text-sm text-gray-500">Hace 2 horas</span>
            </div>
            <p className="text-gray-700 text-sm">
              Trabajando en la solución del problema...
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Agregar un comentario..."
          ></textarea>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Agregar Comentario
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para campos de detalle
const DetailField = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 block mb-1">
      {label}
    </label>
    <p className="text-gray-900">{value}</p>
  </div>
);

// Componente auxiliar para items del timeline
const TimelineItem = ({ evento, isLast }) => {
  const tipoColors = {
    creacion: 'bg-blue-500',
    asignacion: 'bg-purple-500',
    estado: 'bg-yellow-500',
    resolucion: 'bg-green-500',
    prioridad: 'bg-orange-500'
  };

  const color = tipoColors[evento.tipo] || 'bg-gray-500';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
        )}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex justify-between items-start">
          <span className="font-medium text-gray-900">{evento.usuario}</span>
          <span className="text-sm text-gray-500">
            {new Date(evento.fecha).toLocaleString('es-AR')}
          </span>
        </div>
        <p className="text-gray-700 mt-1">{evento.accion}</p>
      </div>
    </div>
  );
};

export default DetalleTicket;