import React from 'react';
import { useAppStore } from './store/useAppStore';
import { AppShell } from './components/layout/AppShell';
import { DashboardView } from './components/views/DashboardView';
import { ProcessListView } from './components/views/ProcessListView';
import { ProcessDesignerShell } from './components/views/ProcessDesignerShell';
import { StateWrapper } from './components/shared/StateWrapper';

export const App: React.FC = () => {
  const { activeTab } = useAppStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'processes':
        return <ProcessListView />;
      case 'designer':
        return <ProcessDesignerShell />;
      case 'tasks':
        return (
          <StateWrapper
            mode="success"
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-2">Bandeja de Tareas (Task Inbox)</h2>
              <p className="text-xs text-slate-400">Tus tareas asignadas filtradas por prioridad y vencimiento.</p>
            </div>
          </StateWrapper>
        );
      case 'cases':
        return (
          <StateWrapper mode="success">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-2">Seguimiento de Instancias & Casos</h2>
              <p className="text-xs text-slate-400">Consulta de ejecuciones en tiempo real con mapa en vivo y timeline.</p>
            </div>
          </StateWrapper>
        );
      default:
        return (
          <StateWrapper
            mode="success"
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-2 capitalize">{activeTab}</h2>
              <p className="text-xs text-slate-400">Módulo empresarial integrado en ProcessFlow.</p>
            </div>
          </StateWrapper>
        );
    }
  };

  return <AppShell>{renderActiveView()}</AppShell>;
};
