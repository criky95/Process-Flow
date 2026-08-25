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
  Trash2,
  GitFork,
  FileSignature,
  Boxes,
} from 'lucide-react';
import { DecisionCondition } from '../../types';

export const PropertyPanel: React.FC = () => {
  const { designerNodes, selectedNodeId, updateNodeData, setSelectedNodeId, deleteNode } = useAppStore();
  const [activeTab, setActiveTab] = useState<'general' | 'params' | 'assignment' | 'instructions' | 'forms' | 'documents' | 'sla' | 'rules' | 'notifications' | 'advanced'>('general');

  const selectedNode = designerNodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500 select-none">
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
            <span className="text-[10px] text-slate-500 font-mono">Tipo: {data.nodeType} · ID: {selectedNode.id}</span>
          </div>
        </div>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/40 overflow-x-auto text-[11px] font-medium no-scrollbar">
        {[
          { id: 'general', label: 'General' },
          { id: 'params', label: 'Parámetros Nivel' },
          { id: 'assignment', label: 'Asignación' },
          { id: 'instructions', label: 'Instrucciones' },
          { id: 'sla', label: 'SLA' },
          { id: 'advanced', label: 'Avanzado' },
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

        {/* Specialized Parameters Per Node Type */}
        {activeTab === 'params' && (
          <div className="space-y-4">
            {/* TIMER NODE CONFIG */}
            {data.nodeType === 'timer' && (
              <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs border-b border-slate-800 pb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Configuración de Timer / Espera</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Modo de Espera</label>
                  <select
                    value={data.timerConfig?.mode || 'duration'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        timerConfig: { ...(data.timerConfig || { mode: 'duration' }), mode: e.target.value as any },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="duration">Duración Relativa (Horas / Días)</option>
                    <option value="fixed_date">Fecha Límite Fija (ISO)</option>
                    <option value="webhook_event">Espera a Evento / Webhook Externo</option>
                  </select>
                </div>

                {data.timerConfig?.mode === 'duration' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Cantidad</label>
                      <input
                        type="number"
                        value={data.timerConfig?.durationValue || 24}
                        onChange={(e) =>
                          updateNodeData(selectedNode.id, {
                            timerConfig: { ...(data.timerConfig || { mode: 'duration' }), durationValue: parseInt(e.target.value) || 1 },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Unidad</label>
                      <select
                        value={data.timerConfig?.durationUnit || 'hours'}
                        onChange={(e) =>
                          updateNodeData(selectedNode.id, {
                            timerConfig: { ...(data.timerConfig || { mode: 'duration' }), durationUnit: e.target.value as any },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                      >
                        <option value="minutes">Minutos</option>
                        <option value="hours">Horas</option>
                        <option value="days">Días</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NOTIFICATION NODE CONFIG */}
            {data.nodeType === 'notification' && (
              <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-yellow-400 font-semibold text-xs border-b border-slate-800 pb-1.5">
                  <Bell className="w-3.5 h-3.5" />
                  <span>Configuración de Notificación</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Canal de Envío</label>
                  <select
                    value={data.notificationConfig?.channel || 'email'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        notificationConfig: { ...(data.notificationConfig || { channel: 'email', recipientType: 'initiator' }), channel: e.target.value as any },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  >
                    <option value="email">Correo Electrónico (Email)</option>
                    <option value="whatsapp">WhatsApp Business API</option>
                    <option value="sms">Mensaje SMS</option>
                    <option value="in_app">Notificación In-App</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Destinatario</label>
                  <select
                    value={data.notificationConfig?.recipientType || 'initiator'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        notificationConfig: { ...(data.notificationConfig || { channel: 'email', recipientType: 'initiator' }), recipientType: e.target.value as any },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  >
                    <option value="initiator">Iniciador del Caso</option>
                    <option value="assignee">Asignado Actual</option>
                    <option value="role">Rol de Organización</option>
                    <option value="dynamic_email">Correo Dinámico (Variable)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Asunto de Notificación</label>
                  <input
                    type="text"
                    value={data.notificationConfig?.subject || 'Actualización de Trámite ProcessFlow'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        notificationConfig: { ...(data.notificationConfig || { channel: 'email', recipientType: 'initiator' }), subject: e.target.value },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Plantilla del Mensaje (Variables: {"{{caseId}}, {{initiator}}"})</label>
                  <textarea
                    rows={3}
                    value={data.notificationConfig?.bodyTemplate || 'Estimado {{initiator}}, su caso {{caseId}} ha cambiado de estado.'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        notificationConfig: { ...(data.notificationConfig || { channel: 'email', recipientType: 'initiator' }), bodyTemplate: e.target.value },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>
            )}

            {/* DECISION NODE CONFIG */}
            {data.nodeType === 'decision' && (
              <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs border-b border-slate-800 pb-1.5">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Reglas de Decisión Condicional</span>
                </div>

                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between font-mono text-slate-200">
                    <span>Regla #1:</span>
                    <span className="text-emerald-400">monto &gt; 10000 USD</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Salida → Aprobación Gerente Finanzas (Sí)</div>
                </div>
              </div>
            )}

            {/* SIGNATURE NODE CONFIG */}
            {data.nodeType === 'signature' && (
              <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs border-b border-slate-800 pb-1.5">
                  <FileSignature className="w-3.5 h-3.5" />
                  <span>Configuración de Firma Digital</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Nivel de Firma Requerido</label>
                  <select
                    value={data.signatureConfig?.level || 'simple'}
                    onChange={(e) =>
                      updateNodeData(selectedNode.id, {
                        signatureConfig: { level: e.target.value as any },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  >
                    <option value="simple">Firma Electrónica Simple (Aceptación en pantalla)</option>
                    <option value="pki_certificate">Certificado Digital PKI (Firma Cualificada)</option>
                    <option value="sms_otp">Token OTP por SMS</option>
                    <option value="biometric">Firma Biométrica Manuscrita</option>
                  </select>
                </div>
              </div>
            )}

            {/* OTHER NODE TYPES */}
            {data.nodeType !== 'timer' && data.nodeType !== 'notification' && data.nodeType !== 'decision' && data.nodeType !== 'signature' && (
              <div className="p-3 bg-slate-950/60 rounded border border-slate-800 text-[11px] text-slate-400">
                Parámetros específicos cargados según la definición inmutable del nodo <strong className="text-white">{data.nodeType}</strong>.
              </div>
            )}
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
          </div>
        )}
      </div>

      {/* Delete Node Action Button */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="w-full px-3 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Eliminar Actividad del Grafo</span>
        </button>
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
