// ========================================
// src/components/Dashboard.jsx
// ========================================
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Users, AlertCircle, CheckCircle, Clock, Edit2 } from 'lucide-react';
import { getEstadoColor, getPrioridadColor, getSlaColor } from '../utils/helpers';
import { ESTADOS, PRIORIDADES } from '../utils/constants';

const Dashboard = ({ 
  tickets, 
  usuarioActual,
  onVerDetalle,
  onEditarTicket 
}) => {
  // Calcular estadísticas
  const misTickets = tickets.filter(t => t.asignadoA === usuarioActual.nombre);
  
  const estadisticas = {
    total: tickets.length,
    abiertos: tickets.filter(t => !['Resuelto', 'Cerrado'].includes(t.estado)).length,
    resueltos: tickets.filter(t => t.estado === 'Resuelto').length,
    criticos: tickets.filter(t => 
      t.prioridad === 'Crítica' && 
      !['Resuelto', 'Cerrado'].includes(t.estado)
    ).length,
    misPendientes: misTickets.filter(t => 
      !['Resuelto', 'Cerrado'].includes(t.estado)
    ).length
  };

  // Datos para gráficos
  const ticketsPorEstado = ESTADOS.map(estado => ({
    estado,
    cantidad: tickets.filter(t => t.estado === estado).length
  })).filter(e => e.cantidad > 0);

  const ticketsPorPrioridad = PRIORIDADES.map(prioridad => ({
    name: prioridad,
    value: tickets.filter(t => t.prioridad === prioridad).length,
    color: {
      'Crítica': '#dc2626',
      'Alta': '#f97316',
      'Media': '#eab308',
      'Baja': '#3b82f6'
    }[prioridad]
  })).filter(p => p.value > 0);

  const ticketsCriticos = tickets.filter(t => 
    t.prioridad === 'Crítica' && 
    !['Resuelto', 'Cerrado'].includes(t.estado)
  );

  return (
    <div className="space-y-6">
      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          titulo="Total Tickets"
          valor={estadisticas.total}
          icono={<Users className="w-8 h-8 text-blue-600" />}
          color="blue"
        />
        <MetricCard
          titulo="Abiertos"
          valor={estadisticas.abiertos}
          icono={<AlertCircle className="w-8 h-8 text-orange-600" />}
          color="orange"
        />
        <MetricCard
          titulo="Resueltos"
          valor={estadisticas.resueltos}
          icono={<CheckCircle className="w-8 h-8 text-green-600" />}
          color="green"
        />
        <MetricCard
          titulo="Críticos"
          valor={estadisticas.criticos}
          icono={<Clock className="w-8 h-8 text-red-600" />}
          color="red"
        />
        <MetricCard
          titulo="Mis Tickets"
          valor={estadisticas.misPendientes}
          icono={<Users className="w-8 h-8 text-purple-600" />}
          color="purple"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Tickets por Estado
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsPorEstado}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Distribución por Prioridad
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketsPorPrioridad}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {ticketsPorPrioridad.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tickets Críticos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Tickets Críticos Pendientes
        </h3>
        
        {ticketsCriticos.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">
            No hay tickets críticos pendientes
          </p>
        ) : (
          <div className="space-y-3">
            {ticketsCriticos.map(ticket => (
              <div 
                key={ticket.id} 
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {ticket.numero}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {ticket.titulo}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-600">
                        Asignado a: {ticket.asignadoA || 'Sin asignar'}
                      </span>
                      <span className={getSlaColor(ticket.slaHoras)}>
                        SLA: {ticket.slaHoras > 0 
                          ? `${ticket.slaHoras.toFixed(1)}h` 
                          : `Vencido ${Math.abs(ticket.slaHoras).toFixed(1)}h`
                        }
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {ticket.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-white px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
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
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente auxiliar para las tarjetas de métricas
const MetricCard = ({ titulo, valor, icono, color }) => {
  const colorClasses = {
    blue: 'border-blue-500',
    orange: 'border-orange-500',
    green: 'border-green-500',
    red: 'border-red-500',
    purple: 'border-purple-500'
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{titulo}</p>
          <p className="text-3xl font-bold text-gray-900">{valor}</p>
        </div>
        <div className="flex-shrink-0">
          {icono}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;