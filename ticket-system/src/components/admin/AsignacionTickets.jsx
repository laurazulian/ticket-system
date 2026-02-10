// ========================================
// src/components/admin/AsignacionTickets.jsx
// ========================================
import React, { useState } from 'react';
import { UserPlus, Zap, Filter, RefreshCw, Users, Target } from 'lucide-react';
import { getPrioridadColor, getEstadoColor } from '../../utils/helpers';
import { TECNICOS } from '../../utils/constants';

const AsignacionTickets = ({ tickets, usuarios, onActualizarTicket }) => {
  const [filtroArea, setFiltroArea] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('sin-asignar');
  const [modoAsignacion, setModoAsignacion] = useState('manual'); // 'manual' o 'automatica'

  // Filtrar tickets
  const ticketsFiltrados = tickets.filter(t => {
    const cumpleArea = filtroArea === 'todas' || t.area === filtroArea;
    const cumpleEstado = filtroEstado === 'todos' || 
      (filtroEstado === 'sin-asignar' && !t.asignadoA) ||
      (filtroEstado === 'asignados' && t.asignadoA);
    return cumpleArea && cumpleEstado;
  });

  const ticketsSinAsignar = tickets.filter(t => !t.asignadoA && !['Resuelto', 'Cerrado'].includes(t.estado));

  // Asignación automática (Round Robin simple)
  const asignacionAutomatica = () => {
    if (ticketsSinAsignar.length === 0) {
      alert('No hay tickets sin asignar');
      return;
    }

    const tecnicosDisponibles = TECNICOS;
    let index = 0;

    ticketsSinAsignar.forEach(ticket => {
      const tecnicoAsignado = tecnicosDisponibles[index % tecnicosDisponibles.length];
      onActualizarTicket(ticket.id, { 
        asignadoA: tecnicoAsignado,
        estado: ticket.estado === 'Nuevo' ? 'Asignado' : ticket.estado
      });
      index++;
    });

    alert(`${ticketsSinAsignar.length} tickets asignados automáticamente`);
  };

  // Asignación por carga de trabajo
  const asignacionPorCarga = () => {
    if (ticketsSinAsignar.length === 0) {
      alert('No hay tickets sin asignar');
      return;
    }

    // Calcular carga actual de cada técnico
    const cargaTecnicos = TECNICOS.map(tecnico => ({
      nombre: tecnico,
      carga: tickets.filter(t => 
        t.asignadoA === tecnico && 
        !['Resuelto', 'Cerrado'].includes(t.estado)
      ).length
    })).sort((a, b) => a.carga - b.carga);

    // Asignar a los técnicos con menor carga
    ticketsSinAsignar.forEach((ticket, idx) => {
      const tecnico = cargaTecnicos[idx % cargaTecnicos.length];
      onActualizarTicket(ticket.id, { 
        asignadoA: tecnico.nombre,
        estado: ticket.estado === 'Nuevo' ? 'Asignado' : ticket.estado
      });
    });

    alert(`${ticketsSinAsignar.length} tickets asignados por carga de trabajo`);
  };

  // Asignación por prioridad
  const asignacionPorPrioridad = () => {
    if (ticketsSinAsignar.length === 0) {
      alert('No hay tickets sin asignar');
      return;
    }

    // Ordenar tickets por prioridad
    const ticketsOrdenados = [...ticketsSinAsignar].sort((a, b) => {
      const prioridades = { 'Crítica': 0, 'Alta': 1, 'Media': 2, 'Baja': 3 };
      return prioridades[a.prioridad] - prioridades[b.prioridad];
    });

    // Calcular carga de técnicos
    const cargaTecnicos = TECNICOS.map(tecnico => ({
      nombre: tecnico,
      carga: tickets.filter(t => 
        t.asignadoA === tecnico && 
        !['Resuelto', 'Cerrado'].includes(t.estado)
      ).length
    }));

    // Asignar tickets críticos y altos primero a técnicos con menor carga
    ticketsOrdenados.forEach(ticket => {
      const tecnicoMenorCarga = cargaTecnicos.sort((a, b) => a.carga - b.carga)[0];
      onActualizarTicket(ticket.id, { 
        asignadoA: tecnicoMenorCarga.nombre,
        estado: ticket.estado === 'Nuevo' ? 'Asignado' : ticket.estado
      });
      tecnicoMenorCarga.carga++;
    });

    alert(`${ticketsSinAsignar.length} tickets asignados por prioridad`);
  };

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-600 font-medium">Sin Asignar</p>
          <p className="text-3xl font-bold text-orange-900">{ticketsSinAsignar.length}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Asignados</p>
          <p className="text-3xl font-bold text-blue-900">
            {tickets.filter(t => t.asignadoA && !['Resuelto', 'Cerrado'].includes(t.estado)).length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 font-medium">Técnicos Activos</p>
          <p className="text-3xl font-bold text-green-900">{TECNICOS.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Promedio por Técnico</p>
          <p className="text-3xl font-bold text-purple-900">
            {(tickets.filter(t => t.asignadoA && !['Resuelto', 'Cerrado'].includes(t.estado)).length / TECNICOS.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Acciones de Asignación Automática */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Asignación Automática
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={asignacionAutomatica}
            disabled={ticketsSinAsignar.length === 0}
            className="bg-white border border-blue-300 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Round Robin
          </button>
          <button
            onClick={asignacionPorCarga}
            disabled={ticketsSinAsignar.length === 0}
            className="bg-white border border-blue-300 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            Por Carga de Trabajo
          </button>
          <button
            onClick={asignacionPorPrioridad}
            disabled={ticketsSinAsignar.length === 0}
            className="bg-white border border-blue-300 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Target className="w-4 h-4" />
            Por Prioridad
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Asigna {ticketsSinAsignar.length} tickets sin asignar automáticamente según el algoritmo seleccionado
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="todas">Todas las áreas</option>
          <option value="TELECOM">Telecomunicaciones</option>
          <option value="INFRA">Infraestructura</option>
          <option value="DESARROLLO">Desarrollo</option>
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="todos">Todos</option>
          <option value="sin-asignar">Sin asignar</option>
          <option value="asignados">Asignados</option>
        </select>
      </div>

      {/* Lista de Tickets */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asignado a</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ticketsFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No hay tickets que coincidan con los filtros
                </td>
              </tr>
            ) : (
              ticketsFiltrados.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{ticket.numero}</div>
                    <div className="text-xs text-gray-500">{ticket.area}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{ticket.titulo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadColor(ticket.prioridad)}`}>
                      {ticket.prioridad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(ticket.estado)}`}>
                      {ticket.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={ticket.asignadoA || ''}
                      onChange={(e) => onActualizarTicket(ticket.id, { 
                        asignadoA: e.target.value,
                        estado: ticket.estado === 'Nuevo' ? 'Asignado' : ticket.estado
                      })}
                      className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sin asignar</option>
                      {TECNICOS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!ticket.asignadoA && (
                      <button
                        onClick={() => {
                          // Asignar al técnico con menos carga
                          const cargaTecnicos = TECNICOS.map(tecnico => ({
                            nombre: tecnico,
                            carga: tickets.filter(t => 
                              t.asignadoA === tecnico && 
                              !['Resuelto', 'Cerrado'].includes(t.estado)
                            ).length
                          })).sort((a, b) => a.carga - b.carga);
                          
                          onActualizarTicket(ticket.id, { 
                            asignadoA: cargaTecnicos[0].nombre,
                            estado: 'Asignado'
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                      >
                        <UserPlus className="w-4 h-4" />
                        Auto-asignar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Carga de Trabajo por Técnico */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Carga de Trabajo Actual</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECNICOS.map(tecnico => {
            const ticketsTecnico = tickets.filter(t => 
              t.asignadoA === tecnico && 
              !['Resuelto', 'Cerrado'].includes(t.estado)
            );
            const criticos = ticketsTecnico.filter(t => t.prioridad === 'Crítica').length;
            
            return (
              <div key={tecnico} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{tecnico}</p>
                    <p className="text-sm text-gray-500">
                      {ticketsTecnico.length} tickets activos
                    </p>
                  </div>
                  {criticos > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {criticos} críticos
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacidad</span>
                    <span className="font-medium">{ticketsTecnico.length}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        ticketsTecnico.length > 7 ? 'bg-red-500' :
                        ticketsTecnico.length > 5 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((ticketsTecnico.length / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AsignacionTickets;