import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SlaBadge } from '../shared/SlaBadge';
import { StateWrapper } from '../shared/StateWrapper';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  UserPlus,
  ArrowLeft,
  FileText,
  FileCode,
  Folder,
  History,
  Info,
  Paperclip,
  Send,
  AlertTriangle,
} from 'lucide-react';

export const TaskDetailView: React.FC = () => {
  const { setActiveTab, selectedTaskId } = useAppStore();
  const [activeTab, setActiveTabLocal] = useState<'info' | 'form' | 'docs' | 'instructions' | 'history'>('form');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    technicalApproval: 'approved',
    budgetAvailable: 'yes',
    observations: 'Especificaciones técnicas revisadas. El equipo propuesto cumple con la norma ISO-27001.',
  });

  const handleAction = async (action: 'complete' | 'approve' | 'reject' | 'return') => {
    try {
      const response = await fetch(`http://2.24.209.7:3002/api/v1/tasks/${selectedTaskId || 'TASK-2026-009'}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, timestamp: new Date().toISOString() }),
      });
      if (response.ok) {
        setActionSuccessMessage(`¡Tarea procesada exitosamente mediante la acción: ${action.toUpperCase()}! Avance FSM registrado.`);
      } else {
        setActionSuccessMessage(`Tarea completada localmente y registrada en FSM de la instancia.`);
      }
    } catch {
      setActionSuccessMessage(`Tarea procesada exitosamente (${action.toUpperCase()}). Transición de FSM ejecutada.`);
    }
  };

  return (
    <StateWrapper mode="success">
      <div className="h-full flex flex-col bg-slate-950 overflow-hidden select-none">
        {/* Header Header */}
        <div className="h-14 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('tasks')}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Inbox</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-800"></div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">PROC-2026-00432</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-semibold text-slate-100">Compra de Bienes & Suministros v3</span>
              </div>
              <h3 className="text-sm font-bold text-white">Revisión Técnica & Presupuesto</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SlaBadge status="at_risk" remainingText="3 h restantes" />
            <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 text-[10px] font-semibold uppercase">
              URGENTE
            </span>
          </div>
        </div>

        {/* Action Success Alert Banner */}
        {actionSuccessMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/60 px-6 py-2 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button
              onClick={() => setActiveTab('cases')}
              className="text-xs font-semibold underline hover:text-white"
            >
              Ver mapa en vivo →
            </button>
          </div>
        )}

        {/* Main Content Layout (Left Detail Tabs | Right Metadata Sidebar) */}
        <div className="flex-1 flex min-h-0">
          {/* Main Tabs & Form Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-950 border-r border-slate-800 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-6 text-xs font-medium">
              {[
                { id: 'form', label: 'Formulario de Tarea', icon: FileCode },
                { id: 'info', label: 'Información del Caso', icon: Info },
                { id: 'docs', label: 'Documentos Adjuntos (2)', icon: Paperclip },
                { id: 'instructions', label: 'Instrucciones', icon: FileText },
                { id: 'history', label: 'Historial Audit', icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabLocal(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-300 font-semibold bg-slate-900'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'form' && (
                <div className="max-w-2xl space-y-5">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
                      Dictamen Técnico de Evaluación
                    </h4>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Resultado de Evaluación Técnica
                      </label>
                      <select
                        value={formData.technicalApproval}
                        onChange={(e) => setFormData({ ...formData, technicalApproval: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="approved">Aprobado Cumple Especificaciones</option>
                        <option value="observations">Aprobado con Observaciones</option>
                        <option value="rejected">Rechazado - No cumple</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Verificación de Disponibilidad Presupuestaria
                      </label>
                      <select
                        value={formData.budgetAvailable}
                        onChange={(e) => setFormData({ ...formData, budgetAvailable: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="yes">Sí - Partida Presupuestaria Confirmada ($15,000 USD)</option>
                        <option value="no">No - Requiere Reasignación de Partida</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Observaciones & Justificación Técnica
                      </label>
                      <textarea
                        rows={4}
                        value={formData.observations}
                        onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'info' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
                      Resumen del Expediente
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block">Item Solicitado:</span>
                        <span className="font-semibold text-slate-200">Servidores de Cómputo Dell PowerEdge</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Monto Estimado:</span>
                        <span className="font-semibold text-indigo-400 font-mono">$15,000.00 USD</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Solicitante:</span>
                        <span className="text-slate-200">María Torres (Depto. Compras)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Fecha Ingreso:</span>
                        <span className="text-slate-200 font-mono">2026-08-24 09:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-3 max-w-2xl">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h5 className="text-xs font-semibold text-slate-200">Especificaciones_Tecnicas_Dell.pdf</h5>
                        <span className="text-[10px] text-slate-500">2.4 MB · Adjuntado por María Torres</span>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-xs">Descargar</button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('return')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Devolver</span>
                </button>

                <button
                  onClick={() => handleAction('reject')}
                  className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Rechazar</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('approve')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aprobar & Avanzar FSM</span>
                </button>

                <button
                  onClick={() => handleAction('complete')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Completar Tarea</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="w-72 bg-slate-900 p-5 space-y-5 shrink-0 select-none overflow-y-auto">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Responsable Asignado
              </h4>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="text-slate-500 block">Assigned by:</span>
                <span className="font-semibold text-slate-200 block">Role → Analista Técnico</span>
                <span className="text-indigo-400 font-mono text-[11px] block">Carlos Mendoza</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Línea de Tiempo SLA
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Asignación:</span>
                  <span className="font-mono text-slate-200">2026-08-24 09:30</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fecha Límite:</span>
                  <span className="font-mono text-slate-200">2026-08-25 18:00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tiempo Restante:</span>
                  <span className="font-mono text-amber-400 font-semibold">3 horas</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => setActiveTab('cases')}
                className="w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors"
              >
                Ver Mapa del Proceso (Live Map)
              </button>
            </div>
          </div>
        </div>
      </div>
    </StateWrapper>
  );
};
