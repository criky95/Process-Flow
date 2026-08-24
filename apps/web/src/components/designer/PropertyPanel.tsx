import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  SlidersHorizontal,
  Users,
  FileText,
  FileCode,
  Folder,
  Clock,
  Zap,
  Bell,
  Shield,
  X,
  Check,
} from 'lucide-react';

export const PropertyPanel: React.FC = () => {
  const { designerNodes, selectedNodeId, updateNodeData, setSelectedNodeId } = useAppStore();
  const [activeTab, setActiveTab] = useState<'general' | 'assignment' | 'instructions' | 'forms' | 'documents' | 'sla' | 'rules' | 'notifications' | 'advanced'>('general');

  const selectedNode = designerNodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500">
        <SlidersHorizontal className="w-8 h-8 mb-2 opacity-50 text-indigo-400" />
        <p className="text-xs font-medium text-slate-400">Sin actividad seleccionada</p>
        <p className="text-[11px] text-slate-500 mt-1">Haz clic en un nodo del canvas para configurar sus propiedades.</p>
      </div>
    );
  }

  const { data } = selectedNode;

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full select-none">
      {/* Header Panel */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/40 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <h3 className="text-xs font-semibold text-slate-100 truncate">{data.label}</h3>
            <span className="text-[10px] text-slate-500 font-mono">ID: {selectedNode.id}</span>
          </div>
        </div>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Navigation (9 tabs) */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/40 overflow-x-auto text-[11px] font-medium no-scrollbar">
        {[
          { id: 'general', label: 'General' },
          { id: 'assignment', label: 'Assignment' },
          { id: 'instructions', label: 'Instructions' },
          { id: 'forms', label: 'Forms' },
          { id: 'documents', label: 'Docs' },
          { id: 'sla', label: 'SLA' },
          { id: 'rules', label: 'Rules' },
          { id: 'notifications', label: 'Notif' },
          { id: 'advanced', label: 'Advanced' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-300 font-semibold bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === 'general' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Nombre de Actividad</label>
              <input
                type="text"
                value={data.label}
                onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Descripción Funcional</label>
              <textarea
                rows={3}
                value={data.description || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { description: e.target.value })}
                placeholder="Explica el propósito de esta tarea..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'assignment' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
              <span className="font-semibold block">Estrategia de Asignación:</span>
              Assigned by: <strong className="text-white">Role → {data.assignedRole || 'Analista Técnico'}</strong>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Tipo de Responsable</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none">
                <option value="role">Rol de Organización</option>
                <option value="user">Usuario Específico</option>
                <option value="area">Área Funcional</option>
                <option value="group">Grupo de Trabajo</option>
                <option value="supervisor">Supervisor de Iniciador</option>
                <option value="initiator">Iniciador del Caso</option>
                <option value="dynamic">Responsable Dinámico (Variable)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Rol Asignado</label>
              <input
                type="text"
                value={data.assignedRole || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { assignedRole: e.target.value })}
                placeholder="ej. Analista Técnico, Gerente de Finanzas..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'sla' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">SLA Objetivo (Horas)</label>
              <input
                type="number"
                value={data.slaHours || 24}
                onChange={(e) => updateNodeData(selectedNode.id, { slaHours: parseInt(e.target.value) || 24 })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span>Acción de Escalamiento</span>
                <span className="text-amber-400 font-mono">BullMQ Worker</span>
              </div>
              <p className="text-[10px]">Al vencer el SLA de {data.slaHours || 24}h, se reasignará automáticamente al Supervisor del Área.</p>
            </div>
          </div>
        )}

        {activeTab !== 'general' && activeTab !== 'assignment' && activeTab !== 'sla' && (
          <div className="p-4 rounded border border-dashed border-slate-800 bg-slate-950/40 text-center text-slate-500">
            <p className="text-xs">Configuración avanzada de <span className="font-semibold text-slate-300 capitalize">{activeTab}</span></p>
            <p className="text-[11px] mt-1">Parámetros integrados al schema de la versión inmutable.</p>
          </div>
        )}
      </div>

      {/* Footer Save Node Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <Check className="w-3.5 h-3.5" /> Sincronizado en borrador
        </span>
        <span className="font-mono text-slate-500">Node v1.0</span>
      </div>
    </div>
  );
};
