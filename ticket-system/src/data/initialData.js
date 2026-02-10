export const ticketsIniciales = [
  {
    id: 1,
    numero: 'TELECOM-000001',
    titulo: 'Caída del enlace principal de datos',
    descripcion: 'Los usuarios reportan intermitencia en la conexión a internet desde las 10:00 AM',
    area: 'TELECOM',
    categoria: 'Red de Datos',
    tipo: 'Incidente',
    estado: 'En Progreso',
    prioridad: 'Crítica',
    reportadoPor: 'juan.perez@empresa.com',
    asignadoA: 'Carlos López',
    fechaReporte: '2026-02-04T10:30:00',
    fechaVencimiento: '2026-02-04T18:00:00',
    slaHoras: 4.5,
    progreso: 75,
    ambiente: 'PRODUCCION',
    tags: ['urgente', 'red'],
    timeline: [
      {
        fecha: '2026-02-04T10:30:00',
        usuario: 'juan.perez',
        accion: 'Creó el ticket',
        tipo: 'creacion'
      },
      {
        fecha: '2026-02-04T10:45:00',
        usuario: 'supervisor',
        accion: 'Asignó a Carlos López',
        tipo: 'asignacion'
      },
      {
        fecha: '2026-02-04T11:00:00',
        usuario: 'Carlos López',
        accion: 'Cambió estado a En Progreso',
        tipo: 'estado'
      }
    ]
  },
  {
    id: 2,
    numero: 'INFRA-000045',
    titulo: 'Servidor de aplicaciones con alto consumo de CPU',
    descripcion: 'El servidor PROD-APP-01 presenta un 95% de uso de CPU',
    area: 'INFRA',
    categoria: 'Servidores',
    tipo: 'Incidente',
    estado: 'Resuelto',
    prioridad: 'Alta',
    reportadoPor: 'monitoreo@empresa.com',
    asignadoA: 'María García',
    fechaReporte: '2026-02-03T14:20:00',
    fechaVencimiento: '2026-02-04T14:20:00',
    slaHoras: -2,
    progreso: 100,
    ambiente: 'PRODUCCION',
    tags: ['servidor', 'performance'],
    timeline: [
      {
        fecha: '2026-02-03T14:20:00',
        usuario: 'monitoreo',
        accion: 'Creó el ticket',
        tipo: 'creacion'
      },
      {
        fecha: '2026-02-03T14:30:00',
        usuario: 'María García',
        accion: 'Comenzó trabajo',
        tipo: 'estado'
      },
      {
        fecha: '2026-02-03T18:00:00',
        usuario: 'María García',
        accion: 'Resolvió el ticket',
        tipo: 'resolucion'
      }
    ]
  },
  {
    id: 3,
    numero: 'DEV-000128',
    titulo: 'Error en módulo de reportes',
    descripcion: 'Los usuarios no pueden generar reportes en formato PDF',
    area: 'DESARROLLO',
    categoria: 'Backend',
    tipo: 'Bug',
    estado: 'Asignado',
    prioridad: 'Media',
    reportadoPor: 'ana.martinez@empresa.com',
    asignadoA: 'Pedro Sánchez',
    fechaReporte: '2026-02-04T09:15:00',
    fechaVencimiento: '2026-02-07T09:15:00',
    slaHoras: 67.5,
    progreso: 20,
    ambiente: 'PRODUCCION',
    tags: ['bug', 'reportes'],
    timeline: [
      {
        fecha: '2026-02-04T09:15:00',
        usuario: 'ana.martinez',
        accion: 'Creó el ticket',
        tipo: 'creacion'
      },
      {
        fecha: '2026-02-04T09:30:00',
        usuario: 'supervisor',
        accion: 'Asignó a Pedro Sánchez',
        tipo: 'asignacion'
      }
    ]
  },
  {
    id: 4,
    numero: 'TELECOM-000002',
    titulo: 'Solicitud de nuevo enlace dedicado',
    descripcion: 'Solicitud de contratación de enlace de 100Mbps para nueva oficina',
    area: 'TELECOM',
    categoria: 'Enlaces',
    tipo: 'Requerimiento',
    estado: 'Nuevo',
    prioridad: 'Baja',
    reportadoPor: 'direccion@empresa.com',
    asignadoA: null,
    fechaReporte: '2026-02-04T11:00:00',
    fechaVencimiento: '2026-02-11T11:00:00',
    slaHoras: 167,
    progreso: 0,
    ambiente: 'N/A',
    tags: ['nuevo-enlace'],
    timeline: [
      {
        fecha: '2026-02-04T11:00:00',
        usuario: 'direccion',
        accion: 'Creó el ticket',
        tipo: 'creacion'
      }
    ]
  },
  {
    id: 5,
    numero: 'INFRA-000046',
    titulo: 'Mantenimiento preventivo de storage',
    descripcion: 'Programar mantenimiento mensual del sistema de almacenamiento',
    area: 'INFRA',
    categoria: 'Storage',
    tipo: 'Mantenimiento',
    estado: 'Pendiente Cliente',
    prioridad: 'Media',
    reportadoPor: 'sistemas@empresa.com',
    asignadoA: 'María García',
    fechaReporte: '2026-02-02T08:00:00',
    fechaVencimiento: '2026-02-05T08:00:00',
    slaHoras: 20,
    progreso: 60,
    ambiente: 'PRODUCCION',
    tags: ['mantenimiento', 'storage'],
    timeline: [
      {
        fecha: '2026-02-02T08:00:00',
        usuario: 'sistemas',
        accion: 'Creó el ticket',
        tipo: 'creacion'
      },
      {
        fecha: '2026-02-02T09:00:00',
        usuario: 'María García',
        accion: 'Inició trabajo',
        tipo: 'estado'
      },
      {
        fecha: '2026-02-03T10:00:00',
        usuario: 'María García',
        accion: 'Esperando respuesta del cliente',
        tipo: 'estado'
      }
    ]
  }
];