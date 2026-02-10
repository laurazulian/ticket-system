import React from 'react';

const Navigation = ({ vistaActual, onCambiarVista }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tickets', label: 'Todos los Tickets' },
    { id: 'mis-tickets', label: 'Mis Tickets' }
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onCambiarVista(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                vistaActual === tab.id || (tab.id === 'tickets' && vistaActual === 'detalle')
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;