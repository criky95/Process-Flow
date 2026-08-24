import React from 'react';
import { useAppStore } from './store/useAppStore';
import { AppShell } from './components/layout/AppShell';
import { DashboardView } from './components/views/DashboardView';
import { ProcessListView } from './components/views/ProcessListView';
import { ProcessDesignerShell } from './components/views/ProcessDesignerShell';
import { TaskInboxView } from './components/views/TaskInboxView';
import { TaskDetailView } from './components/views/TaskDetailView';
import { CaseDetailView } from './components/views/CaseDetailView';
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
        return <TaskInboxView />;
      case 'task_detail':
        return <TaskDetailView />;
      case 'cases':
        return <CaseDetailView />;
      default:
        return (
          <StateWrapper mode="success">
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
