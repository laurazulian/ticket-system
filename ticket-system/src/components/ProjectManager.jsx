import React, { useState } from "react";
import { Plus, User, ClipboardList } from "lucide-react";

const mockUsers = [
  { id: 1, nombre: "Laura" },
  { id: 2, nombre: "Carlos" },
  { id: 3, nombre: "Ana" },
];

export default function ProjectManager({ onGenerarTicket }) {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState("");

  const crearProyecto = () => {
    if (!nuevoProyecto.trim()) return;

    const proyecto = {
      id: Date.now(),
      nombre: nuevoProyecto,
      tareas: [],
    };

    setProyectos([...proyectos, proyecto]);
    setNuevoProyecto("");
  };

  const agregarTarea = (proyectoId) => {
    const descripcion = prompt("Descripción de la tarea:");
    if (!descripcion) return;

    const nuevaTarea = {
      id: Date.now(),
      descripcion,
      estado: "pendiente",
      asignadoA: null,
    };

    setProyectos((prev) =>
      prev.map((p) =>
        p.id === proyectoId
          ? { ...p, tareas: [...p.tareas, nuevaTarea] }
          : p
      )
    );
  };

  const asignarUsuario = (proyectoId, tareaId, userId) => {
    setProyectos((prev) =>
      prev.map((p) =>
        p.id === proyectoId
          ? {
              ...p,
              tareas: p.tareas.map((t) =>
                t.id === tareaId ? { ...t, asignadoA: userId } : t
              ),
            }
          : p
      )
    );
  };

  const cambiarEstado = (proyectoId, tareaId, nuevoEstado) => {
    setProyectos((prev) =>
      prev.map((p) =>
        p.id === proyectoId
          ? {
              ...p,
              tareas: p.tareas.map((t) =>
                t.id === tareaId ? { ...t, estado: nuevoEstado } : t
              ),
            }
          : p
      )
    );
  };

  const generarTicket = (proyecto, tarea) => {
    if (!onGenerarTicket) return;

    onGenerarTicket({
      titulo: `[${proyecto.nombre}] ${tarea.descripcion}`,
      descripcion: `Tarea generada desde Project Manager`,
      responsable: tarea.asignadoA,
      prioridad: "media",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Project Manager</h2>

      {/* Crear proyecto */}
      <div className="flex gap-2">
        <input
          value={nuevoProyecto}
          onChange={(e) => setNuevoProyecto(e.target.value)}
          placeholder="Nuevo proyecto..."
          className="border rounded px-3 py-2 w-80"
        />
        <button
          onClick={crearProyecto}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Crear
        </button>
      </div>

      {/* Lista proyectos */}
      <div className="space-y-6">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{proyecto.nombre}</h3>
              <button
                onClick={() => agregarTarea(proyecto.id)}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                + Tarea
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {["pendiente", "en_progreso", "completada"].map((estado) => (
                <div key={estado}>
                  <h4 className="text-sm font-medium mb-2 capitalize">
                    {estado.replace("_", " ")}
                  </h4>

                  <div className="space-y-2">
                    {proyecto.tareas
                      .filter((t) => t.estado === estado)
                      .map((tarea) => (
                        <div
                          key={tarea.id}
                          className="bg-gray-50 p-3 rounded border"
                        >
                          <p className="text-sm">{tarea.descripcion}</p>

                          {/* Usuario */}
                          <select
                            className="mt-2 w-full text-sm border rounded px-2 py-1"
                            value={tarea.asignadoA || ""}
                            onChange={(e) =>
                              asignarUsuario(
                                proyecto.id,
                                tarea.id,
                                Number(e.target.value)
                              )
                            }
                          >
                            <option value="">Asignar usuario</option>
                            {mockUsers.map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.nombre}
                              </option>
                            ))}
                          </select>

                          {/* Acciones */}
                          <div className="flex justify-between mt-2 text-xs">
                            <div className="flex gap-1">
                              {estado !== "pendiente" && (
                                <button
                                  onClick={() =>
                                    cambiarEstado(
                                      proyecto.id,
                                      tarea.id,
                                      "pendiente"
                                    )
                                  }
                                >
                                  ←
                                </button>
                              )}
                              {estado !== "completada" && (
                                <button
                                  onClick={() =>
                                    cambiarEstado(
                                      proyecto.id,
                                      tarea.id,
                                      estado === "pendiente"
                                        ? "en_progreso"
                                        : "completada"
                                    )
                                  }
                                >
                                  →
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                generarTicket(proyecto, tarea)
                              }
                              className="flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <ClipboardList size={14} />
                              Ticket
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}