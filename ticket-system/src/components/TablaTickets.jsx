// ========================================
// src/components/TablaTickets.jsx
// ========================================
import React from 'react';
import { Edit2, Trash2, Tag } from 'lucide-react';
import { getPrioridadColor, getEstadoColor, getSlaColor } from '../utils/helpers';
import { ESTADOS, PRIORIDADES, TECNICOS } from '../utils/constants';

const TablaTickets = ({
  tickets,
  ticketsSeleccionados,
  setTicketsSeleccionados,
  onActualizarTicket,
  onEliminarTicket,
  onVerDetalle,
  onEditarTicket
}) => {
  const handleSelectAll = (checked) => {
    if (checked) {
      setTicketsSeleccionados(tickets.map(t => t.id));
    } else {
      setTicketsSeleccionados([]);
    }
  };

  const handleSelectTicket = (ticketId, checked) => {
    if (checked) {
      setTicketsSeleccionados([...ticketsSeleccionados, ticketId]);
    } else {
      setTicketsSeleccionados(ticketsSeleccionados.filter(id => id !== ticketId));
    }
  };

  const todasSeleccionadas = tickets.length > 0 && ticketsSeleccionados.length === tickets.length;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={todasSeleccionadas}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asignado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SLA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                  No se encontraron tickets
                </td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={ticketsSeleccionados.includes(ticket.id)}
                      onChange={(e) => handleSelectTicket(ticket.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ticket.numero}
                    </div>
                    <div className="text-xs text-gray-500">
                      {ticket.tipo}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {ticket.titulo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={ticket.prioridad}
                      onChange={(e) => onActualizarTicket(ticket.id, { prioridad: e.target.value })}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${getPrioridadColor(ticket.prioridad)}`}
                    >
                      {PRIORIDADES.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={ticket.estado}
                      onChange={(e) => onActualizarTicket(ticket.id, { estado: e.target.value })}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${getEstadoColor(ticket.estado)}`}
                    >
                      {ESTADOS.map(e => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={ticket.asignadoA || ''}
                      onChange={(e) => onActualizarTicket(ticket.id, { asignadoA: e.target.value })}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sin asignar</option>
                      {TECNICOS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${getSlaColor(ticket.slaHoras)}`}>
                      {ticket.slaHoras > 0 
                        ? `${ticket.slaHoras.toFixed(1)}h` 
                        : `${Math.abs(ticket.slaHoras).toFixed(1)}h ⚠️`
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {ticket.tags && ticket.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onVerDetalle(ticket)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => onEditarTicket(ticket)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEliminarTicket(ticket.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaTickets;