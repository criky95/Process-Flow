import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SlaBadge } from '../shared/SlaBadge';
import { StatusBadge } from '../shared/StatusBadge';
import { StateWrapper } from '../shared/StateWrapper';
import { TaskItem } from '../../types';
import {
  CheckSquare,
  Search,
  Filter,
  ArrowRight,
  Clock,
  UserCheck,
  AlertTriangle,
  FileText,
  Calendar,
} from 'lucide-react';

export const TaskInboxView: React.FC = () => {
  const { tasks, setActiveTab, setSelectedTaskId } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'mine' | 'team' | 'pending' | 'overdue' | 'today'>('mine');
  const [searchTerm, setSearchTerm] = useState('');

  const overdueCount = tasks.filter((t) => t.slaStatus === 'overdue').length;
  const todayCount = tasks.filter((t) => t.slaStatus === 'at_risk').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.processName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedTo && task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeFilter === 'overdue') return matchesSearch && task.slaStatus === 'overdue';
    if (activeFilter === 'today') return matchesSearch && task.slaStatus === 'at_risk';
    if (activeFilter === 'pending') return matchesSearch && task.status === 'pending';
    return matchesSearch;
  });

  const handleOpenTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setActiveTab('task_detail');
  };

  return (
    <StateWrapper mode="success">
      <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-950 text-slate-100 pb-20">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
              Bandeja de Tareas (Task Inbox)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestión operativa de actividades asignadas, prioridades y tiempos de servicio (SLA).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Total activas: <strong className="text-indigo-400">{filteredTasks.length}</strong> / {tasks.length}
            </span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80 w-full sm:w-auto overflow-x-auto">
            {[
              { id: 'mine', label: `Mis Tareas (${tasks.length})` },
              { id: 'team', label: `Equipo (${tasks.length})` },
              { id: 'pending', label: `Pendientes (${pendingCount})` },
              { id: 'today', label: `Vencen Hoy (${todayCount})` },
              { id: 'overdue', label: `Vencidas (${overdueCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por caso, actividad o proceso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Inbox Task Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Caso / Proceso</th>
                  <th className="py-3 px-4 font-semibold">Actividad Asignada</th>
                  <th className="py-3 px-4 font-semibold">Solicitante</th>
                  <th className="py-3 px-4 font-semibold">Responsable</th>
                  <th className="py-3 px-4 font-semibold">Prioridad</th>
                  <th className="py-3 px-4 font-semibold">Vencimiento SLA</th>
                  <th className="py-3 px-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => handleOpenTask(task.id)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-indigo-400 text-xs">{task.caseId}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{task.processName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {task.activityName}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Rol: {task.assignedRole}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      {task.requester}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="font-medium text-slate-200">{task.assignedTo || 'Sin asignar'}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          task.priority === 'urgent'
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                            : task.priority === 'high'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <SlaBadge status={task.slaStatus} remainingText={task.slaRemainingText} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenTask(task.id);
                        }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ejecutar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StateWrapper>
  );
};
