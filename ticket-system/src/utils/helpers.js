export const getPrioridadColor = (prioridad) => {
  const colores = {
    'Crítica': 'bg-red-100 text-red-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-blue-100 text-blue-800'
  };
  return colores[prioridad] || 'bg-gray-100 text-gray-800';
};

export const getEstadoColor = (estado) => {
  const colores = {
    'Nuevo': 'bg-blue-100 text-blue-800',
    'Asignado': 'bg-amber-100 text-amber-800',
    'En Progreso': 'bg-purple-100 text-purple-800',
    'Pendiente Cliente': 'bg-red-100 text-red-800',
    'En Testing': 'bg-teal-100 text-teal-800',
    'Resuelto': 'bg-green-100 text-green-800',
    'Cerrado': 'bg-gray-100 text-gray-800'
  };
  return colores[estado] || 'bg-gray-100 text-gray-800';
};

export const getSlaColor = (horas) => {
  if (horas < 0) return 'text-red-600 font-bold';
  if (horas < 4) return 'text-orange-600 font-semibold';
  if (horas < 24) return 'text-yellow-600';
  return 'text-green-600';
};

export const generarNumeroTicket = (area, tickets) => {
  const numero = Math.max(...tickets.map(t => t.id), 0) + 1;
  return `${area}-${String(numero).padStart(6, '0')}`;
};

export const calcularSlaHoras = (prioridad) => {
  const slaMap = {
    'Crítica': 4,
    'Alta': 24,
    'Media': 72,
    'Baja': 168
  };
  return slaMap[prioridad] || 72;
};