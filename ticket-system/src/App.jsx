// ========================================
// src/App.jsx - Versión Modularizada
// ========================================
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ticketsIniciales } from './data/initialData';
import { generarNumeroTicket, calcularSlaHoras } from './utils/helpers';

// Layout Components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import PanelNotificaciones from './components/PanelNotificaciones';

// View Components
import Dashboard from './components/Dashboard';
import ListaTickets from './components/ListaTickets';
import DetalleTicket from './components/DetalleTicket';
import MisTickets from './components/MisTickets';

// Modal Components
import ModalNuevoTicket from './components/modals/ModalNuevoTicket';
import ModalEdicion from './components/modals/ModalEdicion';
import ModalCambiosMasivos from './components/modals/ModalCambiosMasivos';

const App = () => {
  // ========================================
  // ESTADO GLOBAL
  // ========================================
  const [tickets, setTickets] = useLocalStorage('tickets', ticketsIniciales);
  const [notificaciones, setNotificaciones] = useLocalStorage('notificaciones', []);
  const [usuarioActual] = useState({
    nombre: 'Carlos López',
    rol: 'tecnico',
    email: 'carlos.lopez@empresa.com'
  });

  // ========================================
  // ESTADO LOCAL
  // ========================================
  const [vistaActual, setVistaActual] = useState('dashboard');
  const [vistaTickets, setVistaTickets] = useState('lista'); // 'lista' o 'kanban'
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);
  const [ticketEditando, setTicketEditando] = useState(null);
  
  // Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarCambiosMasivos, setMostrarCambiosMasivos] = useState(false);

  // Filtros
  const [filtros, setFiltros] = useState({
    busqueda: '',
    area: 'todas',
    estado: 'todos',
    prioridad: 'todas',
    asignadoA: 'todos'
  });

  // ========================================
  // FUNCIONES DE NEGOCIO
  // ========================================
  
  const agregarNotificacion = (tipo, mensaje, ticketId = null) => {
    const nuevaNotif = {
      id: Date.now(),
      tipo,
      mensaje,
      ticketId,
      fecha: new Date().toISOString(),
      leida: false
    };
    setNotificaciones(prev => [nuevaNotif, ...prev].slice(0, 50));
  };

  const marcarNotificacionLeida = (notifId) => {
    setNotificaciones(prev =>
      prev.map(n => n.id === notifId ? { ...n, leida: true } : n)
    );
  };

  const agregarTimeline = (ticketId, accion, tipo) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          timeline: [
            ...t.timeline,
            {
              fecha: new Date().toISOString(),
              usuario: usuarioActual.nombre,
              accion,
              tipo
            }
          ]
        };
      }
      return t;
    }));
  };

  const actualizarTicket = (ticketId, cambios) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const ticketActualizado = { ...t, ...cambios };
        
        // Notificaciones según el cambio
        if (cambios.estado && cambios.estado !== t.estado) {
          agregarNotificacion(
            'estado',
            `Ticket ${t.numero} cambió a ${cambios.estado}`,
            ticketId
          );
          agregarTimeline(ticketId, `Cambió estado a ${cambios.estado}`, 'estado');
        }
        
        if (cambios.asignadoA && cambios.asignadoA !== t.asignadoA) {
          agregarNotificacion(
            'asignacion',
            `Ticket ${t.numero} asignado a ${cambios.asignadoA}`,
            ticketId
          );
          agregarTimeline(ticketId, `Asignó a ${cambios.asignadoA}`, 'asignacion');
        }
        
        if (cambios.prioridad && cambios.prioridad !== t.prioridad) {
          agregarTimeline(ticketId, `Cambió prioridad a ${cambios.prioridad}`, 'prioridad');
        }
        
        return ticketActualizado;
      }
      return t;
    }));
  };

  const crearTicket = (nuevoTicket) => {
    const ticket = {
      ...nuevoTicket,
      id: Math.max(...tickets.map(t => t.id), 0) + 1,
      numero: generarNumeroTicket(nuevoTicket.area, tickets),
      fechaReporte: new Date().toISOString(),
      reportadoPor: usuarioActual.email,
      progreso: 0,
      slaHoras: calcularSlaHoras(nuevoTicket.prioridad),
      timeline: [{
        fecha: new Date().toISOString(),
        usuario: usuarioActual.nombre,
        accion: 'Creó el ticket',
        tipo: 'creacion'
      }]
    };
    
    setTickets(prev => [...prev, ticket]);
    agregarNotificacion('creacion', `Nuevo ticket creado: ${ticket.numero}`, ticket.id);
    return ticket;
  };

  const eliminarTicket = (ticketId) => {
    if (confirm('¿Estás seguro de eliminar este ticket?')) {
      const ticket = tickets.find(t => t.id === ticketId);
      setTickets(prev => prev.filter(t => t.id !== ticketId));
      agregarNotificacion('eliminacion', `Ticket ${ticket.numero} eliminado`);
    }
  };

  const aplicarCambiosMasivos = (cambios) => {
    ticketsSeleccionados.forEach(id => {
      actualizarTicket(id, cambios);
    });
    setTicketsSeleccionados([]);
    setMostrarCambiosMasivos(false);
    agregarNotificacion('masivo', `${ticketsSeleccionados.length} tickets actualizados`);
  };

  // ========================================
  // HANDLERS
  // ========================================
  
  const handleVerDetalle = (ticket) => {
    setTicketSeleccionado(ticket);
    setVistaActual('detalle');
  };

  const handleEditarTicket = (ticket) => {
    setTicketEditando(ticket);
    setMostrarModalEdicion(true);
  };

  const handleNuevoTicket = () => {
    setMostrarModal(true);
  };

  const handleToggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  // ========================================
  // DATOS COMPUTADOS
  // ========================================
  
  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  // ========================================
  // RENDER
  // ========================================
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        usuarioActual={usuarioActual}
        notificacionesNoLeidas={notificacionesNoLeidas}
        onMostrarNotificaciones={handleToggleNotificaciones}
        onNuevoTicket={handleNuevoTicket}
      />

      <Navigation
        vistaActual={vistaActual}
        onCambiarVista={setVistaActual}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {vistaActual === 'dashboard' && (
          <Dashboard
            tickets={tickets}
            usuarioActual={usuarioActual}
            onVerDetalle={handleVerDetalle}
            onEditarTicket={handleEditarTicket}
          />
        )}
        
        {vistaActual === 'tickets' && (
          <ListaTickets
            tickets={tickets}
            filtros={filtros}
            setFiltros={setFiltros}
            vistaTickets={vistaTickets}
            setVistaTickets={setVistaTickets}
            ticketsSeleccionados={ticketsSeleccionados}
            setTicketsSeleccionados={setTicketsSeleccionados}
            onActualizarTicket={actualizarTicket}
            onEliminarTicket={eliminarTicket}
            onVerDetalle={handleVerDetalle}
            onEditarTicket={handleEditarTicket}
            onCambiosMasivos={() => setMostrarCambiosMasivos(true)}
          />
        )}

        {vistaActual === 'detalle' && (
          <DetalleTicket
            ticket={ticketSeleccionado}
            onVolver={() => setVistaActual('tickets')}
            onEditar={handleEditarTicket}
          />
        )}

        {vistaActual === 'mis-tickets' && (
          <MisTickets
            tickets={tickets}
            usuarioActual={usuarioActual}
            onVerDetalle={handleVerDetalle}
            onEditarTicket={handleEditarTicket}
          />
        )}
      </main>

      {/* Modales y Panels */}
      <PanelNotificaciones
        mostrar={mostrarNotificaciones}
        notificaciones={notificaciones}
        onCerrar={() => setMostrarNotificaciones(false)}
        onLimpiar={() => setNotificaciones([])}
        onMarcarLeida={marcarNotificacionLeida}
      />

      <ModalNuevoTicket
        mostrar={mostrarModal}
        onCerrar={() => setMostrarModal(false)}
        onCrear={crearTicket}
      />

      <ModalEdicion
        mostrar={mostrarModalEdicion}
        ticket={ticketEditando}
        onCerrar={() => {
          setMostrarModalEdicion(false);
          setTicketEditando(null);
        }}
        onGuardar={(ticketId, cambios) => {
          actualizarTicket(ticketId, cambios);
          setMostrarModalEdicion(false);
          setTicketEditando(null);
        }}
      />

      <ModalCambiosMasivos
        mostrar={mostrarCambiosMasivos}
        ticketsSeleccionados={ticketsSeleccionados}
        onCerrar={() => setMostrarCambiosMasivos(false)}
        onAplicar={aplicarCambiosMasivos}
      />
    </div>
  );
};

export default App;