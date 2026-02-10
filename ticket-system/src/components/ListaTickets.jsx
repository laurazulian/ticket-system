// ========================================
// src/components/ListaTickets.jsx
// ========================================
import React from 'react';
import { Search, List, Grid } from 'lucide-react';
import { ESTADOS, PRIORIDADES, TECNICOS } from '../utils/constants';
import TablaTickets from './TablaTickets'
import KanbanView from './Kanbanview';

const ListaTickets = ({
  tickets,
  filtros,
  setFiltros,
  vistaTickets,
  setVistaTickets,
  ticketsSeleccionados,
  setTicketsSeleccionados,
  onActualizarTicket,
  onEliminarTicket,
  onVerDetalle,
  onEditarTicket,
  onCambiosMasivos
}) => {
  // Filtrar tickets
  const ticketsFiltrados = tickets.filter(ticket => {
    const cumpleBusqueda = 
      ticket.numero.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      ticket.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const cumpleArea = filtros.area === 'todas' || ticket.area === filtros.area;
    const cumpleEstado = filtros.estado === 'todos' || ticket.estado === filtros.estado;
    const cumplePrioridad = filtros.prioridad === 'todas' || ticket.prioridad === filtros.prioridad;
    const cumpleAsignado = filtros.asignadoA === 'todos' || ticket.asignadoA === filtros.asignadoA;
    
    return cumpleBusqueda && cumpleArea && cumpleEstado && cumplePrioridad && cumpleAsignado;
  });

  return (
    <div className="space-y-6">
      {/* Panel de Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setVistaTickets('lista')}
              className={`p-2 rounded transition-colors ${
                vistaTickets === 'lista' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Vista de Lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVistaTickets('kanban')}
              className={`p-2 rounded transition-colors ${
                vistaTickets === 'kanban' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Vista Kanban"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número o título..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filtros.busqueda}
              onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
            />
          </div>
          
          {/* Filtro Área */}
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filtros.area}
            onChange={(e) => setFiltros({...filtros, area: e.target.value})}
          >
            <option value="todas">Todas las áreas</option>
            <option value="TELECOM">Telecomunicaciones</option>
            <option value="INFRA">Infraestructura</option>
            <option value="DESARROLLO">Desarrollo</option>
          </select>

          {/* Filtro Estado */}
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filtros.estado}
            onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
          >
            <option value="todos">Todos los estados</option>
            {ESTADOS.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>

          {/* Filtro Prioridad */}
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filtros.prioridad}
            onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
          >
            <option value="todas">Todas las prioridades</option>
            {PRIORIDADES.map(prioridad => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>

          {/* Filtro Asignado */}
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filtros.asignadoA}
            onChange={(e) => setFiltros({...filtros, asignadoA: e.target.value})}
          >
            <option value="todos">Todos los técnicos</option>
            {TECNICOS.map(tecnico => (
              <option key={tecnico} value={tecnico}>{tecnico}</option>
            ))}
          </select>
        </div>

        {/* Banner de selección múltiple */}
        {ticketsSeleccionados.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm font-medium text-blue-900">
              {ticketsSeleccionados.length} ticket{ticketsSeleccionados.length !== 1 ? 's' : ''} seleccionado{ticketsSeleccionados.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={onCambiosMasivos}
              className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
            >
              Cambios masivos
            </button>
            <button
              onClick={() => setTicketsSeleccionados([])}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Limpiar selección
            </button>
          </div>
        )}

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {ticketsFiltrados.length} de {tickets.length} tickets
        </div>
      </div>

      {/* Vista de tickets */}
      {vistaTickets === 'lista' ? (
        <TablaTickets
          tickets={ticketsFiltrados}
          ticketsSeleccionados={ticketsSeleccionados}
          setTicketsSeleccionados={setTicketsSeleccionados}
          onActualizarTicket={onActualizarTicket}
          onEliminarTicket={onEliminarTicket}
          onVerDetalle={onVerDetalle}
          onEditarTicket={onEditarTicket}
        />
      ) : (
        <KanbanView
          tickets={ticketsFiltrados}
          onActualizarTicket={onActualizarTicket}
          onVerDetalle={onVerDetalle}
        />
      )}
    </div>
  );
};

export default ListaTickets;