import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StateWrapper } from '../shared/StateWrapper';
import { SlaBadge } from '../shared/SlaBadge';
import { TaskItem } from '../../types';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  PauseCircle,
  ArrowUpRight,
  UserCheck,
  History,
  Workflow,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentRole, tasks, setActiveTab, setSelectedTaskId } = useAppStore();

  const priorityTasks = tasks
    .filter(
      (t) =>
        t.priority === 'urgent' ||
        t.priority === 'high' ||
        t.slaStatus === 'at_risk' ||
        t.slaStatus === 'overdue'
    )
    .slice(0, 5);

  const dueTodayCount = tasks.filter((t) => t.slaStatus === 'at_risk').length;
  const overdueCount = tasks.filter((t) => t.slaStatus === 'overdue').length;

  const recentAuditEvents = [
    {
      id: 'evt-1',
      time: 'Hace 12 min',
      event: 'TASK_COMPLETED',
      description: 'María López completó "Aprobación de Fondo Fijo" en PROC-2026-00410',
      actor: 'María López (Aprobador)',
    },
    {
      id: 'evt-2',
      time: 'Hace 45 min',
      event: 'PROCESS_VERSION_PUBLISHED',
      description: 'Se publicó la versión inmutable "Compra de bienes v3" por Arquitecto',
      actor: 'System Architect',
    },
    {
      id: 'evt-3',
      time: 'Hace 1 h',
      event: 'SLA_ALERT_TRIGGERED',
      description: 'SLA At Risk disparado en TASK-2026-009 (Notificación enviada a supervisor)',
      actor: 'BullMQ SLA Engine',
    },
  ];

  const handleOpenSpecificTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setActiveTab('task_detail');
  };

  return (
    <StateWrapper mode="success">
      <div className="h-full overflow-y-auto p-6 space-y-6">
        {/* Header Summary */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Dashboard Operativo
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-normal">
                {currentRole.replace('_', ' ').toUpperCase()}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Panel de control de tareas activas, cumplimiento de SLAs y eventos de proceso.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tasks')}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ir a Bandeja de Tareas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actionable KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Mis Tareas Abiertas</span>
              <div className="text-2xl font-bold text-slate-100 mt-1">{tasks.length}</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Asignadas en plataforma</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Vencen Hoy</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">{dueTodayCount}</div>
              <span className="text-[11px] text-amber-500/80 mt-0.5 block font-medium">Requieren acción inmediata</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Vencidas (Overdue)</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">{overdueCount}</div>
              <span className="text-[11px] text-rose-500/80 mt-0.5 block font-medium">Notificado a supervisor</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/40 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">En Espera / Bloqueadas</span>
              <div className="text-2xl font-bold text-slate-300 mt-1">4</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Pendientes de terceros</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center">
              <PauseCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Priority Task Section & Activity Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priority Task Table (2 Columns Span) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Tareas de Alta Prioridad & SLAs en Riesgo
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">{priorityTasks.length} Tareas críticas</span>
            </div>

            <div className="divide-y divide-slate-800/60 overflow-x-auto">
              {priorityTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => handleOpenSpecificTask(task.id)}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {task.caseId}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs font-medium text-slate-300 truncate">
                        {task.processName}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{task.activityName}</h4>
                    <p className="text-xs text-slate-400">
                      Solicitante: <span className="text-slate-300 font-medium">{task.requester}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <SlaBadge status={task.slaStatus} remainingText={task.slaRemainingText} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSpecificTask(task.id);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded text-xs font-medium transition-all cursor-pointer"
                    >
                      Ejecutar Tarea →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Audit Activity Feed (1 Column Span) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Auditoría Reciente (Append-only)
              </h3>
            </div>

            <div className="space-y-4 flex-1">
              {recentAuditEvents.map((evt) => (
                <div key={evt.id} className="relative pl-4 border-l-2 border-slate-800 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-indigo-400 font-semibold">{evt.event}</span>
                    <span className="text-slate-500">{evt.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{evt.description}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Actor: {evt.actor}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Trazabilidad verificada
              </span>
              <button
                onClick={() => setActiveTab('audit')}
                className="text-indigo-400 hover:underline text-[11px]"
              >
                Ver log completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </StateWrapper>
  );
};
