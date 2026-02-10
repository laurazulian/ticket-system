// ========================================
// src/components/MisTickets.jsx
// ========================================
import React from 'react';
import { Edit2 } from 'lucide-react';
import { getPrioridadColor, getEstadoColor, getSlaColor } from '../utils/helpers';

const MisTickets = ({ tickets, usuarioActual, onVerDetalle, onEditarTicket }) => {
  const misTickets = tickets.filter(t => t.asignadoA === usuarioActual.nombre);
  const ticketsPendientes = misTickets.filter(t => 
    !['Resuelto', 'Cerrado'].includes(t.estado)
  );
  const ticketsCompletados = misTickets.filter(t => 
    ['Resuelto', 'Cerrado'].includes(t.estado)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Mis Tickets Asignados
        </h2>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Total Asignados" 
            value={misTickets.length} 
            bgColor="bg-blue-50" 
            textColor="text-blue-900"
          />
          <StatCard 
            label="Pendientes" 
            value={ticketsPendientes.length} 
            bgColor="bg-orange-50" 
            textColor="text-orange-900"
          />
          <StatCard 
            label="Completados" 
            value={ticketsCompletados.length} 
            bgColor="bg-green-50" 
            textColor="text-green-900"
          />
        </div>

        {/* Lista de Tickets Pendientes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">
            Tickets Pendientes ({ticketsPendientes.length})
          </h3>
          
          {ticketsPendientes.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              No tienes tickets pendientes
            </p>
          ) : (
            ticketsPendientes.map(ticket => (
              <MiTicketCard
                key={ticket.id}
                ticket={ticket}
                onVerDetalle={onVerDetalle}
                onEditarTicket={onEditarTicket}
              />
            ))
          )}
        </div>

        {/* Lista de Tickets Completados (colapsable) */}
        {ticketsCompletados.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <details className="group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Tickets Completados ({ticketsCompletados.length})</span>
                <span className="transition group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-4 space-y-3">
                {ticketsCompletados.map(ticket => (
                  <MiTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onVerDetalle={onVerDetalle}
                    onEditarTicket={onEditarTicket}
                    isCompleted
                  />
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente auxiliar para las tarjetas de estadísticas
const StatCard = ({ label, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </div>
);

// Componente auxiliar para las tarjetas de tickets
const MiTicketCard = ({ ticket, onVerDetalle, onEditarTicket, isCompleted }) => (
  <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
    isCompleted ? 'bg-gray-50' : 'bg-white'
  }`}>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {/* Badges de número, prioridad y estado */}
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="font-semibold text-gray-900">
            {ticket.numero}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadColor(ticket.prioridad)}`}>
            {ticket.prioridad}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(ticket.estado)}`}>
            {ticket.estado}
          </span>
        </div>
        
        {/* Título */}
        <p className="text-gray-700 mb-2 font-medium">
          {ticket.titulo}
        </p>
        
        {/* Información adicional */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className={getSlaColor(ticket.slaHoras)}>
            SLA: {ticket.slaHoras > 0 
              ? `${ticket.slaHoras.toFixed(1)}h` 
              : `Vencido ${Math.abs(ticket.slaHoras).toFixed(1)}h`
            }
          </span>
          
          {/* Barra de progreso */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${ticket.progreso}%` }}
              ></div>
            </div>
            <span className="text-xs min-w-[3rem] text-right">
              {ticket.progreso}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onVerDetalle(ticket)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ver
        </button>
        {!isCompleted && (
          <button
            onClick={() => onEditarTicket(ticket)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default MisTickets;