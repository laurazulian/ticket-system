// ========================================
// src/components/admin/EstadisticasAdmin.jsx
// ========================================
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const EstadisticasAdmin = ({ tickets, usuarios, proyectos }) => {
  // Calcular estadísticas generales
  const ticketsResueltos = tickets.filter(t => t.estado === 'Resuelto').length;
  const ticketsCerrados = tickets.filter(t => t.estado === 'Cerrado').length;
  const ticketsPendientes = tickets.filter(t => !['Resuelto', 'Cerrado'].includes(t.estado)).length;
  const ticketsVencidos = tickets.filter(t => t.slaHoras < 0 && !['Resuelto', 'Cerrado'].includes(t.estado)).length;

  const tasaResolucion = ((ticketsResueltos + ticketsCerrados) / tickets.length * 100).toFixed(1);

  // Tickets por técnico
  const ticketsPorTecnico = usuarios
    .filter(u => u.rol === 'tecnico')
    .map(usuario => ({
      nombre: usuario.nombre.split(' ')[0],
      activos: tickets.filter(t => t.asignadoA === usuario.nombre && !['Resuelto', 'Cerrado'].includes(t.estado)).length,
      resueltos: tickets.filter(t => t.asignadoA === usuario.nombre && ['Resuelto', 'Cerrado'].includes(t.estado)).length,
      total: tickets.filter(t => t.asignadoA === usuario.nombre).length
    }))
    .sort((a, b) => b.total - a.total);

  // Tickets por área
  const ticketsPorArea = [
    { area: 'TELECOM', cantidad: tickets.filter(t => t.area === 'TELECOM').length },
    { area: 'INFRA', cantidad: tickets.filter(t => t.area === 'INFRA').length },
    { area: 'DESARROLLO', cantidad: tickets.filter(t => t.area === 'DESARROLLO').length }
  ];

  // Tendencia semanal (simulada)
  const tendenciaSemanal = [
    { dia: 'Lun', creados: 8, resueltos: 5 },
    { dia: 'Mar', creados: 12, resueltos: 9 },
    { dia: 'Mié', creados: 10, resueltos: 11 },
    { dia: 'Jue', creados: 15, resueltos: 8 },
    { dia: 'Vie', creados: 11, resueltos: 13 },
    { dia: 'Sáb', creados: 3, resueltos: 2 },
    { dia: 'Dom', creados: 2, resueltos: 1 }
  ];

  // Top técnicos
  const topTecnicos = [...ticketsPorTecnico].sort((a, b) => b.resueltos - a.resueltos).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          titulo="Tasa de Resolución"
          valor={`${tasaResolucion}%`}
          icono={<CheckCircle className="w-8 h-8" />}
          color="green"
          tendencia="+5.2%"
        />
        <KPICard
          titulo="Tickets Pendientes"
          valor={ticketsPendientes}
          icono={<Clock className="w-8 h-8" />}
          color="blue"
        />
        <KPICard
          titulo="Tickets Vencidos"
          valor={ticketsVencidos}
          icono={<AlertTriangle className="w-8 h-8" />}
          color="red"
          tendencia={ticketsVencidos > 5 ? "Crítico" : "Normal"}
        />
        <KPICard
          titulo="Técnicos Activos"
          valor={usuarios.filter(u => u.rol === 'tecnico' && u.activo).length}
          icono={<Users className="w-8 h-8" />}
          color="purple"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendencia Semanal */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tendencia Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tendenciaSemanal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="creados" stroke="#3b82f6" name="Creados" strokeWidth={2} />
              <Line type="monotone" dataKey="resueltos" stroke="#10b981" name="Resueltos" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tickets por Área */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tickets por Área</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsPorArea}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Desempeño por Técnico */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Desempeño por Técnico</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ticketsPorTecnico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activos" fill="#f59e0b" name="Activos" />
            <Bar dataKey="resueltos" fill="#10b981" name="Resueltos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Técnicos */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Top 5 Técnicos del Mes
        </h3>
        <div className="space-y-3">
          {topTecnicos.map((tecnico, index) => (
            <div key={tecnico.nombre} className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' :
                index === 2 ? 'bg-orange-600' :
                'bg-blue-500'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{tecnico.nombre}</p>
                <p className="text-sm text-gray-600">{tecnico.resueltos} tickets resueltos</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-bold text-gray-900">{tecnico.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para KPIs
const KPICard = ({ titulo, valor, icono, color, tendencia }) => {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-indigo-600',
    red: 'from-red-500 to-rose-600',
    purple: 'from-purple-500 to-violet-600'
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`bg-gradient-to-br ${colorClasses[color]} p-3 rounded-lg text-white`}>
          {icono}
        </div>
        {tendencia && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            tendencia.includes('+') ? 'bg-green-100 text-green-700' :
            tendencia === 'Crítico' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {tendencia}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{titulo}</p>
      <p className="text-3xl font-bold text-gray-900">{valor}</p>
    </div>
  );
};

export default EstadisticasAdmin;