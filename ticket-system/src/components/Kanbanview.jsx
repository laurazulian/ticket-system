// ========================================
// src/components/KanbanView.jsx
// ========================================
import React from 'react';
import { getPrioridadColor, getSlaColor } from '../utils/helpers';
import { ESTADOS } from '../utils/constants';

const KanbanView = ({ tickets, onActualizarTicket, onVerDetalle }) => {
  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData('ticketId', ticketId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, nuevoEstado) => {
    e.preventDefault();
    const ticketId = parseInt(e.dataTransfer.getData('ticketId'));
    onActualizarTicket(ticketId, { estado: nuevoEstado });
  };

  // Solo mostramos los primeros 5 estados para el Kanban
  const estadosKanban = ESTADOS.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {estadosKanban.map(estado => {
        const ticketsEstado = tickets.filter(t => t.estado === estado);
        
        return (
          <div
            key={estado}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, estado)}
            className="bg-gray-50 rounded-lg p-4 min-h-[500px]"
          >
            {/* Header de la columna */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700">{estado}</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                {ticketsEstado.length}
              </span>
            </div>

            {/* Tarjetas de tickets */}
            <div className="space-y-3">
              {ticketsEstado.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  Sin tickets
                </p>
              ) : (
                ticketsEstado.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onDragStart={handleDragStart}
                    onVerDetalle={onVerDetalle}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Componente de tarjeta individual
const TicketCard = ({ ticket, onDragStart, onVerDetalle }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, ticket.id)}
      className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-all cursor-move border border-gray-200 hover:border-blue-300"
    >
      {/* Header de la tarjeta */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-gray-500">
          {ticket.numero}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPrioridadColor(ticket.prioridad)}`}>
          {ticket.prioridad}
        </span>
      </div>

      {/* Título */}
      <h4 className="font-medium text-sm text-gray-900 mb-3 line-clamp-2">
        {ticket.titulo}
      </h4>

      {/* Información adicional */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="truncate mr-2">
            {ticket.asignadoA || 'Sin asignar'}
          </span>
          <span className={getSlaColor(ticket.slaHoras)}>
            {ticket.slaHoras > 0 
              ? `${ticket.slaHoras.toFixed(0)}h` 
              : '⚠️'
            }
          </span>
        </div>

        {/* Progreso */}
        {ticket.progreso > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${ticket.progreso}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{ticket.progreso}%</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {ticket.tags && ticket.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap mb-3">
          {ticket.tags.slice(0, 2).map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {ticket.tags.length > 2 && (
            <span className="text-xs text-gray-500">
              +{ticket.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Footer con botón */}
      <div className="pt-3 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalle(ticket);
          }}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver detalle →
        </button>
      </div>
    </div>
  );
};

export default KanbanView;