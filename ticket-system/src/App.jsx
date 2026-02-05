import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Plus, Clock, AlertCircle, CheckCircle, Users, MessageSquare, Paperclip, X } from 'lucide-react';

const mockTickets = [
  {
    id: 1,
    numero: 'TELECOM-000001',
    titulo: 'Caída del enlace principal de datos',
    descripcion: 'Los usuarios reportan intermitencia en la conexión a internet desde las 10:00 AM',
    proyecto: 'Telecomunicaciones',
    area: 'TELECOM',
    categoria: 'Red de Datos',
    tipo: 'Incidente',
    estado: 'En Progreso',
    prioridad: 'Crítica',
    reportadoPor: 'juan.perez@empresa.com',
    asignadoA: 'Carlos López',
    fechaReporte: '2026-02-04 10:30',
    fechaVencimiento: '2026-02-04 18:00',
    slaHoras: 4.5,
    progreso: 75,
    comentarios: 8,
    adjuntos: 2,
    ambiente: 'PRODUCCION'
  },
  {
    id: 2,
    numero: 'INFRA-000045',
    titulo: 'Servidor de aplicaciones con alto consumo de CPU',
    descripcion: 'El servidor PROD-APP-01 presenta un 95% de uso de CPU',
    proyecto: 'Infraestructura IT',
    area: 'INFRA',
    categoria: 'Servidores',
    tipo: 'Incidente',
    estado: 'Resuelto',
    prioridad: 'Alta',
    reportadoPor: 'monitoreo@empresa.com',
    asignadoA: 'María García',
    fechaReporte: '2026-02-03 14:20',
    fechaVencimiento: '2026-02-04 14:20',
    slaHoras: -2,
    progreso: 100,
    comentarios: 12,
    adjuntos: 1,
    ambiente: 'PRODUCCION'
  },
  {
    id: 3,
    numero: 'DEV-000128',
    titulo: 'Error en módulo de reportes',
    descripcion: 'Los usuarios no pueden generar reportes en formato PDF',
    proyecto: 'Desarrollo',
    area: 'DESARROLLO',
    categoria: 'Backend',
    tipo: 'Bug',
    estado: 'Asignado',
    prioridad: 'Media',
    reportadoPor: 'ana.martinez@empresa.com',
    asignadoA: 'Pedro Sánchez',
    fechaReporte: '2026-02-04 09:15',
    fechaVencimiento: '2026-02-07 09:15',
    slaHoras: 67.5,
    progreso: 20,
    comentarios: 3,
    adjuntos: 0,
    ambiente: 'PRODUCCION'
  },
  {
    id: 4,
    numero: 'TELECOM-000002',
    titulo: 'Solicitud de nuevo enlace dedicado',
    descripcion: 'Solicitud de contratación de enlace de 100Mbps para nueva oficina',
    proyecto: 'Telecomunicaciones',
    area: 'TELECOM',
    categoria: 'Enlaces',
    tipo: 'Requerimiento',
    estado: 'Nuevo',
    prioridad: 'Baja',
    reportadoPor: 'direccion@empresa.com',
    asignadoA: null,
    fechaReporte: '2026-02-04 11:00',
    fechaVencimiento: '2026-02-11 11:00',
    slaHoras: 167,
    progreso: 0,
    comentarios: 1,
    adjuntos: 1,
    ambiente: 'N/A'
  },
  {
    id: 5,
    numero: 'INFRA-000046',
    titulo: 'Mantenimiento preventivo de storage',
    descripcion: 'Programar mantenimiento mensual del sistema de almacenamiento',
    proyecto: 'Infraestructura IT',
    area: 'INFRA',
    categoria: 'Storage',
    tipo: 'Mantenimiento',
    estado: 'Pendiente Cliente',
    prioridad: 'Media',
    reportadoPor: 'sistemas@empresa.com',
    asignadoA: 'María García',
    fechaReporte: '2026-02-02 08:00',
    fechaVencimiento: '2026-02-05 08:00',
    slaHoras: 20,
    progreso: 60,
    comentarios: 5,
    adjuntos: 3,
    ambiente: 'PRODUCCION'
  }
];

const estadisticas = {
  totalTickets: 145,
  ticketsAbiertos: 87,
  ticketsResueltos: 42,
  ticketsCriticos: 12
};

const ticketsPorEstado = [
  { estado: 'Nuevo', cantidad: 15 },
  { estado: 'Asignado', cantidad: 28 },
  { estado: 'En Progreso', cantidad: 34 },
  { estado: 'Pendiente', cantidad: 10 },
  { estado: 'Resuelto', cantidad: 42 },
  { estado: 'Cerrado', cantidad: 16 }
];

const ticketsPorPrioridad = [
  { name: 'Crítica', value: 12, color: '#dc2626' },
  { name: 'Alta', value: 28, color: '#f97316' },
  { name: 'Media', value: 45, color: '#eab308' },
  { name: 'Baja', value: 32, color: '#3b82f6' }
];

const App = () => {
  const [vistaActual, setVistaActual] = useState('dashboard');
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    area: 'todas',
    estado: 'todos',
    prioridad: 'todas'
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  const getPrioridadColor = (prioridad) => {
    const colores = {
      'Crítica': 'bg-red-100 text-red-800',
      'Alta': 'bg-orange-100 text-orange-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Baja': 'bg-blue-100 text-blue-800'
    };
    return colores[prioridad] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoColor = (estado) => {
    const colores = {
      'Nuevo': 'bg-blue-100 text-blue-800',
      'Asignado': 'bg-amber-100 text-amber-800',
      'En Progreso': 'bg-purple-100 text-purple-800',
      'Pendiente Cliente': 'bg-red-100 text-red-800',
      'Resuelto': 'bg-green-100 text-green-800',
      'Cerrado': 'bg-gray-100 text-gray-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const getSlaColor = (horas) => {
    if (horas < 0) return 'text-red-600 font-bold';
    if (horas < 4) return 'text-orange-600 font-semibold';
    if (horas < 24) return 'text-yellow-600';
    return 'text-green-600';
  };

  const ticketsFiltrados = mockTickets.filter(ticket => {
    const cumpleBusqueda = ticket.numero.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                          ticket.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const cumpleArea = filtros.area === 'todas' || ticket.area === filtros.area;
    const cumpleEstado = filtros.estado === 'todos' || ticket.estado === filtros.estado;
    const cumplePrioridad = filtros.prioridad === 'todas' || ticket.prioridad === filtros.prioridad;
    
    return cumpleBusqueda && cumpleArea && cumpleEstado && cumplePrioridad;
  });

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">{estadisticas.totalTickets}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abiertos</p>
              <p className="text-3xl font-bold text-gray-900">{estadisticas.ticketsAbiertos}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resueltos</p>
              <p className="text-3xl font-bold text-gray-900">{estadisticas.ticketsResueltos}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Críticos</p>
              <p className="text-3xl font-bold text-gray-900">{estadisticas.ticketsCriticos}</p>
            </div>
            <Clock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Tickets por Estado</h3>
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
          <h3 className="text-lg font-semibold mb-4">Por Prioridad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketsPorPrioridad}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {ticketsPorPrioridad.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Tickets Críticos Pendientes
        </h3>
        <div className="space-y-3">
          {mockTickets.filter(t => t.prioridad === 'Crítica' && t.estado !== 'Resuelto').map(ticket => (
            <div key={ticket.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{ticket.numero}</p>
                  <p className="text-sm text-gray-700">{ticket.titulo}</p>
                </div>
                <button 
                  onClick={() => { setTicketSeleccionado(ticket); setVistaActual('detalle'); }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ListaTickets = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={filtros.busqueda}
              onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
            />
          </div>
          
          <select 
            className="border rounded-lg px-4 py-2"
            value={filtros.area}
            onChange={(e) => setFiltros({...filtros, area: e.target.value})}
          >
            <option value="todas">Todas las áreas</option>
            <option value="TELECOM">Telecomunicaciones</option>
            <option value="INFRA">Infraestructura</option>
            <option value="DESARROLLO">Desarrollo</option>
          </select>

          <select 
            className="border rounded-lg px-4 py-2"
            value={filtros.estado}
            onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
          >
            <option value="todos">Todos los estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Asignado">Asignado</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Resuelto">Resuelto</option>
          </select>

          <select 
            className="border rounded-lg px-4 py-2"
            value={filtros.prioridad}
            onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
          >
            <option value="todas">Prioridad</option>
            <option value="Crítica">Crítica</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asignado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progreso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ticketsFiltrados.map(ticket => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{ticket.numero}</div>
                  <div className="text-xs text-gray-500">{ticket.tipo}</div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{ticket.titulo}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPrioridadColor(ticket.prioridad)}`}>
                    {ticket.prioridad}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(ticket.estado)}`}>
                    {ticket.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{ticket.asignadoA || 'Sin asignar'}</td>
                <td className="px-6 py-4">
                  <span className={getSlaColor(ticket.slaHoras)}>
                    {ticket.slaHoras > 0 ? `${ticket.slaHoras.toFixed(1)}h` : 'Vencido'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${ticket.progreso}%`}}></div>
                    </div>
                    <span className="text-xs">{ticket.progreso}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => { setTicketSeleccionado(ticket); setVistaActual('detalle'); }}
                    className="text-blue-600 hover:underline"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const DetalleTicket = () => {
    if (!ticketSeleccionado) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{ticketSeleccionado.numero}</h2>
              <p className="text-gray-600">{ticketSeleccionado.titulo}</p>
            </div>
            <button onClick={() => setVistaActual('tickets')} className="text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm text-gray-600">Estado</label>
              <p className="mt-1">
                <span className={`px-3 py-1 text-sm rounded-full ${getEstadoColor(ticketSeleccionado.estado)}`}>
                  {ticketSeleccionado.estado}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Prioridad</label>
              <p className="mt-1">
                <span className={`px-3 py-1 text-sm rounded-full ${getPrioridadColor(ticketSeleccionado.prioridad)}`}>
                  {ticketSeleccionado.prioridad}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Progreso</label>
              <div className="flex items-center mt-2 gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{width: `${ticketSeleccionado.progreso}%`}}></div>
                </div>
                <span className="text-sm">{ticketSeleccionado.progreso}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Proyecto</label>
                <p>{ticketSeleccionado.proyecto}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Categoría</label>
                <p>{ticketSeleccionado.categoria}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Ambiente</label>
                <p>{ticketSeleccionado.ambiente}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Reportado por</label>
                <p>{ticketSeleccionado.reportadoPor}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Asignado a</label>
                <p>{ticketSeleccionado.asignadoA || 'Sin asignar'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Fecha reporte</label>
                <p>{ticketSeleccionado.fechaReporte}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="text-sm text-gray-600">Descripción</label>
            <p className="mt-2">{ticketSeleccionado.descripcion}</p>
          </div>

          <div className="flex gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {ticketSeleccionado.comentarios} comentarios
            </div>
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              {ticketSeleccionado.adjuntos} adjuntos
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Actividad</h3>
          <div className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <div className="flex justify-between">
                <span className="font-medium">{ticketSeleccionado.asignadoA}</span>
                <span className="text-sm text-gray-500">Hace 2 horas</span>
              </div>
              <p className="text-gray-700 mt-1">Identificado problema. Aplicando corrección.</p>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-4">
            <textarea 
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Agregar comentario..."
            ></textarea>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Comentar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ModalNuevoTicket = () => {
    if (!mostrarModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b flex justify-between">
            <h2 className="text-2xl font-bold">Nuevo Ticket</h2>
            <button onClick={() => setMostrarModal(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input type="text" className="w-full border rounded-lg px-4 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Proyecto</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Telecomunicaciones</option>
                  <option>Infraestructura IT</option>
                  <option>Desarrollo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Prioridad</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Media</option>
                  <option>Crítica</option>
                  <option>Alta</option>
                  <option>Baja</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea className="w-full border rounded-lg px-4 py-2" rows="5"></textarea>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3">
            <button 
              onClick={() => setMostrarModal(false)}
              className="px-6 py-2 border rounded-lg"
            >
              Cancelar
            </button>
            <button 
              onClick={() => { setMostrarModal(false); alert('Ticket creado!'); }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sistema de Tickets</h1>
            <button 
              onClick={() => setMostrarModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Ticket
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setVistaActual('dashboard')}
              className={`py-4 border-b-2 ${vistaActual === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setVistaActual('tickets')}
              className={`py-4 border-b-2 ${vistaActual === 'tickets' || vistaActual === 'detalle' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
            >
              Tickets
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {vistaActual === 'dashboard' && <Dashboard />}
        {vistaActual === 'tickets' && <ListaTickets />}
        {vistaActual === 'detalle' && <DetalleTicket />}
      </main>

      <ModalNuevoTicket />
    </div>
  );
};

export default App;