import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '../../store/useAppStore';
import { ProcessNode } from '../designer/ProcessNode';
import { StateWrapper } from '../shared/StateWrapper';
import { StatusBadge } from '../shared/StatusBadge';
import { SlaBadge } from '../shared/SlaBadge';
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ArrowLeft,
  History,
} from 'lucide-react';

export const CaseDetailView: React.FC = () => {
  const { setActiveTab } = useAppStore();

  const nodeTypes = useMemo(() => ({ processNode: ProcessNode as any }), []);

  // Live Map Nodes with Status Highlights
  const caseNodes = [
    {
      id: 'node-start',
      type: 'processNode',
      position: { x: 100, y: 180 },
      data: {
        label: 'Solicitud de Compra',
        nodeType: 'start',
        description: 'Completado por María Torres (hace 5h)',
      },
    },
    {
      id: 'node-tech-review',
      type: 'processNode',
      position: { x: 360, y: 180 },
      data: {
        label: 'Revisión Técnica & Presupuesto',
        nodeType: 'human_task',
        assignedRole: 'Analista Técnico (Carlos Mendoza)',
        slaHours: 48,
        description: '★ ETAPA ACTUAL (RUNNING)',
      },
    },
    {
      id: 'node-decision-amount',
      type: 'processNode',
      position: { x: 640, y: 180 },
      data: {
        label: '¿Monto > $10,000 USD?',
        nodeType: 'decision',
        description: 'Pendiente de transición FSM',
      },
    },
    {
      id: 'node-approval-finances',
      type: 'processNode',
      position: { x: 920, y: 100 },
      data: {
        label: 'Aprobación Gerente Finanzas',
        nodeType: 'approval',
        assignedRole: 'Gerente Financiero',
        slaHours: 24,
      },
    },
    {
      id: 'node-end',
      type: 'processNode',
      position: { x: 1200, y: 180 },
      data: {
        label: 'Orden Generada & Cierre',
        nodeType: 'end',
      },
    },
  ];

  const caseEdges = [
    { id: 'e1', source: 'node-start', target: 'node-tech-review', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e2', source: 'node-tech-review', target: 'node-decision-amount', animated: false, style: { stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5,5' } },
    { id: 'e3', source: 'node-decision-amount', target: 'node-approval-finances', label: 'Sí' },
    { id: 'e4', source: 'node-decision-amount', target: 'node-end', label: 'No' },
    { id: 'e5', source: 'node-approval-finances', target: 'node-end' },
  ];

  const timelineEvents = [
    {
      time: '09:30 AM',
      date: '24 Ago 2026',
      title: 'Solicitud Ingresada',
      actor: 'María Torres (Depto. Compras)',
      description: 'Ingresó expediente con formulario inicial y especificaciones de servidores.',
      status: 'completed',
    },
    {
      time: '10:15 AM',
      date: '24 Ago 2026',
      title: 'Documentación Validada',
      actor: 'Sistema / Middleware MinIO',
      description: 'Ficha técnica adjunta verificada automáticamente.',
      status: 'completed',
    },
    {
      time: '11:00 AM',
      date: '24 Ago 2026',
      title: 'Asignado a Carlos Mendoza',
      actor: 'Process Engine FSM',
      description: 'Tarea "Revisión Técnica & Presupuesto" asignada por rol de Analista Técnico.',
      status: 'current',
    },
  ];

  return (
    <StateWrapper mode="success">
      <div className="h-full flex flex-col bg-slate-950 overflow-hidden select-none">
        {/* Case Header */}
        <div className="h-14 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('tasks')}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-800"></div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">PROC-2026-00432</span>
                <StatusBadge status="in_progress" size="sm" />
              </div>
              <h3 className="text-sm font-bold text-white">Compra de Bienes & Suministros (Versión v3 Published)</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SlaBadge status="at_risk" remainingText="3 h restantes" />
            <button
              onClick={() => setActiveTab('task_detail')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              Ejecutar Tarea Activa →
            </button>
          </div>
        </div>

        {/* Layout split: Top Live Map | Bottom Timeline & Info */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Top Half: Live Process Map */}
          <div className="h-1/2 relative border-b border-slate-800 bg-slate-950">
            <div className="absolute top-3 left-4 z-10 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 flex items-center gap-3 backdrop-blur-md">
              <span className="font-semibold text-white">Live Process Map:</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">● Completado</span>
              <span className="flex items-center gap-1 text-indigo-400 font-semibold animate-pulse">● Etapa Actual</span>
              <span className="flex items-center gap-1 text-slate-400">○ En espera</span>
            </div>

            <ReactFlow
              nodes={caseNodes}
              edges={caseEdges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.3 }}
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
              <Controls className="!bg-slate-900 !border-slate-800 !text-slate-300" />
              <MiniMap className="!bg-slate-900 !border-slate-800" maskColor="rgba(15, 23, 42, 0.7)" />
            </ReactFlow>
          </div>

          {/* Bottom Half: Case Timeline & Metadata */}
          <div className="h-1/2 flex overflow-hidden">
            {/* Case Timeline */}
            <div className="flex-1 p-6 overflow-y-auto border-r border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <History className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Timeline Cronológico del Expediente
                </h4>
              </div>

              <div className="space-y-4">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-800 space-y-1">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <h5 className="font-semibold text-slate-100">{evt.title}</h5>
                      <span className="text-[11px] font-mono text-slate-500">{evt.date} · {evt.time}</span>
                    </div>
                    <p className="text-xs text-slate-300">{evt.description}</p>
                    <span className="text-[10px] font-mono text-indigo-400 block">Actor: {evt.actor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Variables Sidebar */}
            <div className="w-80 p-6 overflow-y-auto bg-slate-900 space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                Variables & Estado Global
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Monto Solicitado:</span>
                  <span className="font-bold text-indigo-400 font-mono text-sm">$15,000.00 USD</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Item / Partida:</span>
                  <span className="text-slate-200">Servidores de Cómputo Dell</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Versión Inmutable:</span>
                  <span className="font-mono text-emerald-400">v3 Published</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StateWrapper>
  );
};
