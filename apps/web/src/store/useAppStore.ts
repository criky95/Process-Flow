import { create } from 'zustand';
import { ProcessRole, ActivityNodeData, NodeType } from '../types';
import { Node, Edge } from '@xyflow/react';

export interface ProcessDraftData {
  id: string;
  name: string;
  code: string;
  version: string;
  status: 'draft' | 'published' | 'archived';
  nodes: Node<ActivityNodeData>[];
  edges: Edge[];
}

export interface GraphSnapshot {
  nodes: Node<ActivityNodeData>[];
  edges: Edge[];
}

const defaultProcessDrafts: Record<string, ProcessDraftData> = {
  'proc-1': {
    id: 'proc-1',
    name: 'Compra de Bienes & Suministros',
    code: 'PROC-COMPRAS',
    version: 'v3 Published',
    status: 'published',
    nodes: [
      {
        id: 'p1-node-start',
        type: 'processNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'Solicitud de Compra',
          nodeType: 'start',
          description: 'Iniciador del trámite por empleado',
        },
      },
      {
        id: 'p1-node-tech-review',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Revisión Técnica',
          nodeType: 'human_task',
          assignedRole: 'Analista Técnico',
          slaHours: 48,
          description: 'Validación de especificaciones técnicas',
        },
      },
      {
        id: 'p1-node-decision-amount',
        type: 'processNode',
        position: { x: 640, y: 180 },
        data: {
          label: '¿Monto > $10,000 USD?',
          nodeType: 'decision',
          description: 'Bifurcación según presupuesto',
        },
      },
      {
        id: 'p1-node-approval-finances',
        type: 'processNode',
        position: { x: 920, y: 100 },
        data: {
          label: 'Aprobación Gerente Finanzas',
          nodeType: 'approval',
          assignedRole: 'Gerente Financiero',
          slaHours: 24,
          description: 'Aprobación de sobrepresupuesto',
        },
      },
      {
        id: 'p1-node-end',
        type: 'processNode',
        position: { x: 1200, y: 180 },
        data: {
          label: 'Orden Generada & Cierre',
          nodeType: 'end',
          description: 'Fin del flujo de compra',
        },
      },
    ],
    edges: [
      { id: 'p1-e1', source: 'p1-node-start', target: 'p1-node-tech-review', animated: true },
      { id: 'p1-e2', source: 'p1-node-tech-review', target: 'p1-node-decision-amount', animated: true },
      { id: 'p1-e3', source: 'p1-node-decision-amount', target: 'p1-node-approval-finances', label: 'Sí' },
      { id: 'p1-e4', source: 'p1-node-decision-amount', target: 'p1-node-end', label: 'No' },
      { id: 'p1-e5', source: 'p1-node-approval-finances', target: 'p1-node-end', animated: true },
    ],
  },
  'proc-2': {
    id: 'proc-2',
    name: 'Contratación de Personal Nuevo',
    code: 'PROC-CONTRATACION',
    version: 'v1 Published',
    status: 'published',
    nodes: [
      {
        id: 'p2-node-start',
        type: 'processNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'Requerimiento de Vacante',
          nodeType: 'start',
          description: 'Apertura de vacante laboral',
        },
      },
      {
        id: 'p2-node-interviews',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Entrevistas & Pruebas',
          nodeType: 'human_task',
          assignedRole: 'Analista de RRHH',
          slaHours: 72,
          description: 'Fase de selección de candidatos',
        },
      },
      {
        id: 'p2-node-offer-approval',
        type: 'processNode',
        position: { x: 640, y: 180 },
        data: {
          label: 'Aprobación de Oferta Salarial',
          nodeType: 'approval',
          assignedRole: 'Gerente de Área',
          slaHours: 24,
          description: 'Aprobación de propuesta económica',
        },
      },
      {
        id: 'p2-node-end',
        type: 'processNode',
        position: { x: 920, y: 180 },
        data: {
          label: 'Contratación Finalizada',
          nodeType: 'end',
          description: 'Alta de empleado en nómina',
        },
      },
    ],
    edges: [
      { id: 'p2-e1', source: 'p2-node-start', target: 'p2-node-interviews', animated: true },
      { id: 'p2-e2', source: 'p2-node-interviews', target: 'p2-node-offer-approval', animated: true },
      { id: 'p2-e3', source: 'p2-node-offer-approval', target: 'p2-node-end', animated: true },
    ],
  },
  'proc-3': {
    id: 'proc-3',
    name: 'Solicitud de Licencia Municipal',
    code: 'PROC-LICENCIA-MUNICIPAL',
    version: 'v4 Draft',
    status: 'draft',
    nodes: [
      {
        id: 'p3-node-start',
        type: 'processNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'Ingreso de Trámite',
          nodeType: 'start',
          description: 'Ingreso por ventanilla única',
        },
      },
      {
        id: 'p3-node-inspection',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Inspección de Campo',
          nodeType: 'human_task',
          assignedRole: 'Inspector Municipal',
          slaHours: 48,
          description: 'Inspección física del establecimiento',
        },
      },
      {
        id: 'p3-node-payment-timer',
        type: 'processNode',
        position: { x: 640, y: 180 },
        data: {
          label: 'Verificación de Tasas (48h)',
          nodeType: 'timer',
          slaHours: 48,
          description: 'Espera automática de pago de aranceles',
        },
      },
      {
        id: 'p3-node-signature',
        type: 'processNode',
        position: { x: 920, y: 180 },
        data: {
          label: 'Firma Digital Alcaldía',
          nodeType: 'signature',
          assignedRole: 'Director de Licencias',
          slaHours: 24,
          description: 'Firma electrónica del documento legal',
        },
      },
      {
        id: 'p3-node-end',
        type: 'processNode',
        position: { x: 1200, y: 180 },
        data: {
          label: 'Otorgamiento de Licencia',
          nodeType: 'end',
          description: 'Expediente cerrado y certificado emitido',
        },
      },
    ],
    edges: [
      { id: 'p3-e1', source: 'p3-node-start', target: 'p3-node-inspection', animated: true },
      { id: 'p3-e2', source: 'p3-node-inspection', target: 'p3-node-payment-timer', animated: true },
      { id: 'p3-e3', source: 'p3-node-payment-timer', target: 'p3-node-signature', animated: true },
      { id: 'p3-e4', source: 'p3-node-signature', target: 'p3-node-end', animated: true },
    ],
  },
  'proc-4': {
    id: 'proc-4',
    name: 'Mantenimiento Preventivo de Planta',
    code: 'PROC-MANTENIMIENTO',
    version: 'v2 Published',
    status: 'published',
    nodes: [
      {
        id: 'p4-node-start',
        type: 'processNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'Alerta / Programación',
          nodeType: 'start',
          description: 'Disparo de mantenimiento preventivo',
        },
      },
      {
        id: 'p4-node-diagnosis',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Diagnóstico Técnico',
          nodeType: 'human_task',
          assignedRole: 'Jefe de Mantenimiento',
          slaHours: 24,
          description: 'Inspección técnica de maquinaria',
        },
      },
      {
        id: 'p4-node-doc-repuestos',
        type: 'processNode',
        position: { x: 640, y: 180 },
        data: {
          label: 'Adjuntar Lista de Repuestos',
          nodeType: 'document',
          assignedRole: 'Técnico de Planta',
          slaHours: 12,
          description: 'Carga de ficha técnica y partes',
        },
      },
      {
        id: 'p4-node-end',
        type: 'processNode',
        position: { x: 920, y: 180 },
        data: {
          label: 'Mantenimiento Ejecutado',
          nodeType: 'end',
          description: 'Ficha de mantenimiento registrada',
        },
      },
    ],
    edges: [
      { id: 'p4-e1', source: 'p4-node-start', target: 'p4-node-diagnosis', animated: true },
      { id: 'p4-e2', source: 'p4-node-diagnosis', target: 'p4-node-doc-repuestos', animated: true },
      { id: 'p4-e3', source: 'p4-node-doc-repuestos', target: 'p4-node-end', animated: true },
    ],
  },
};

export interface AppState {
  currentRole: ProcessRole;
  setRole: (role: ProcessRole) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  activeProcessId: string;
  processDrafts: Record<string, ProcessDraftData>;
  setActiveProcessId: (id: string) => void;

  // Active Process Designer State shortcuts
  designerNodes: Node<ActivityNodeData>[];
  designerEdges: Edge[];
  selectedNodeId: string | null;

  setDesignerNodes: (nodes: Node<ActivityNodeData>[] | ((nds: Node<ActivityNodeData>[]) => Node<ActivityNodeData>[])) => void;
  setDesignerEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;
  setSelectedNodeId: (id: string | null) => void;
  addNodeToDesigner: (type: NodeType) => void;
  updateNodeData: (id: string, patch: Partial<ActivityNodeData>) => void;
  deleteNode: (id: string) => void;

  // Undo / Redo History Stacks
  historyPast: GraphSnapshot[];
  historyFuture: GraphSnapshot[];
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Copy / Paste State
  copiedNodes: Node<ActivityNodeData>[];
  copySelectedNodes: () => void;
  pasteNodes: () => void;

  // JSON Import / Export Exchange
  exportDraftJSON: () => string;
  importDraftJSON: (jsonString: string) => { success: boolean; error?: string };

  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => {
  const recordHistorySnapshot = (state: AppState): { historyPast: GraphSnapshot[]; historyFuture: GraphSnapshot[] } => {
    const currentSnapshot: GraphSnapshot = {
      nodes: JSON.parse(JSON.stringify(state.designerNodes)),
      edges: JSON.parse(JSON.stringify(state.designerEdges)),
    };
    return {
      historyPast: [...state.historyPast.slice(-19), currentSnapshot], // max 20 states
      historyFuture: [],
    };
  };

  return {
    currentRole: 'architect',
    setRole: (role) => set({ currentRole: role }),

    activeTab: 'dashboard',
    setActiveTab: (tab) => set({ activeTab: tab }),

    commandPaletteOpen: false,
    setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

    activeProcessId: 'proc-1',
    processDrafts: defaultProcessDrafts,

    setActiveProcessId: (id) =>
      set((state) => {
        const targetDraft = state.processDrafts[id] || {
          id,
          name: 'Nuevo Proceso Personalizado',
          code: 'PROC-NUEVO',
          version: 'v1 Draft',
          status: 'draft',
          nodes: [
            {
              id: `start-${Date.now()}`,
              type: 'processNode',
              position: { x: 100, y: 180 },
              data: { label: 'Inicio de Proceso', nodeType: 'start' },
            },
            {
              id: `end-${Date.now()}`,
              type: 'processNode',
              position: { x: 500, y: 180 },
              data: { label: 'Fin de Proceso', nodeType: 'end' },
            },
          ],
          edges: [],
        };

        const updatedDrafts = { ...state.processDrafts, [id]: targetDraft };

        return {
          activeProcessId: id,
          processDrafts: updatedDrafts,
          designerNodes: targetDraft.nodes,
          designerEdges: targetDraft.edges,
          selectedNodeId: targetDraft.nodes[0]?.id || null,
          historyPast: [],
          historyFuture: [],
        };
      }),

    designerNodes: defaultProcessDrafts['proc-1'].nodes,
    designerEdges: defaultProcessDrafts['proc-1'].edges,
    selectedNodeId: 'p1-node-tech-review',

    historyPast: [],
    historyFuture: [],
    canUndo: false,
    canRedo: false,

    undo: () =>
      set((state) => {
        if (state.historyPast.length === 0) return state;

        const previous = state.historyPast[state.historyPast.length - 1];
        const newPast = state.historyPast.slice(0, state.historyPast.length - 1);
        const currentSnapshot: GraphSnapshot = {
          nodes: JSON.parse(JSON.stringify(state.designerNodes)),
          edges: JSON.parse(JSON.stringify(state.designerEdges)),
        };

        const currentDraft = state.processDrafts[state.activeProcessId];
        const updatedDrafts = currentDraft
          ? {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, nodes: previous.nodes, edges: previous.edges },
            }
          : state.processDrafts;

        return {
          designerNodes: previous.nodes,
          designerEdges: previous.edges,
          historyPast: newPast,
          historyFuture: [currentSnapshot, ...state.historyFuture],
          canUndo: newPast.length > 0,
          canRedo: true,
          processDrafts: updatedDrafts,
        };
      }),

    redo: () =>
      set((state) => {
        if (state.historyFuture.length === 0) return state;

        const next = state.historyFuture[0];
        const newFuture = state.historyFuture.slice(1);
        const currentSnapshot: GraphSnapshot = {
          nodes: JSON.parse(JSON.stringify(state.designerNodes)),
          edges: JSON.parse(JSON.stringify(state.designerEdges)),
        };

        const currentDraft = state.processDrafts[state.activeProcessId];
        const updatedDrafts = currentDraft
          ? {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, nodes: next.nodes, edges: next.edges },
            }
          : state.processDrafts;

        return {
          designerNodes: next.nodes,
          designerEdges: next.edges,
          historyPast: [...state.historyPast, currentSnapshot],
          historyFuture: newFuture,
          canUndo: true,
          canRedo: newFuture.length > 0,
          processDrafts: updatedDrafts,
        };
      }),

    copiedNodes: [],

    copySelectedNodes: () => {
      const state = get();
      const targetNode = state.designerNodes.find((n) => n.id === state.selectedNodeId);
      if (targetNode) {
        set({ copiedNodes: [JSON.parse(JSON.stringify(targetNode))] });
      }
    },

    pasteNodes: () =>
      set((state) => {
        if (state.copiedNodes.length === 0) return state;

        const historyUpdates = recordHistorySnapshot(state);
        const pastedNodes: Node<ActivityNodeData>[] = state.copiedNodes.map((n) => {
          const newId = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          return {
            ...JSON.parse(JSON.stringify(n)),
            id: newId,
            position: {
              x: n.position.x + 40,
              y: n.position.y + 40,
            },
            data: {
              ...n.data,
              label: `${n.data.label} (Copia)`,
            },
          };
        });

        const updatedNodes = [...state.designerNodes, ...pastedNodes];
        const currentDraft = state.processDrafts[state.activeProcessId];

        return {
          ...historyUpdates,
          canUndo: true,
          canRedo: false,
          designerNodes: updatedNodes,
          selectedNodeId: pastedNodes[0]?.id || state.selectedNodeId,
          processDrafts: currentDraft
            ? {
                ...state.processDrafts,
                [state.activeProcessId]: { ...currentDraft, nodes: updatedNodes },
              }
            : state.processDrafts,
        };
      }),

    exportDraftJSON: () => {
      const state = get();
      const currentDraft = state.processDrafts[state.activeProcessId];
      return JSON.stringify(
        {
          processCode: currentDraft?.code || 'PROC-CUSTOM',
          processName: currentDraft?.name || 'Proceso Personalizado',
          version: currentDraft?.version || 'v1 Draft',
          nodes: state.designerNodes,
          edges: state.designerEdges,
        },
        null,
        2
      );
    },

    importDraftJSON: (jsonString: string) => {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
          return { success: false, error: 'El JSON no contiene un arreglo de "nodes" válido.' };
        }

        const state = get();
        const historyUpdates = recordHistorySnapshot(state);
        const newNodes = parsed.nodes;
        const newEdges = Array.isArray(parsed.edges) ? parsed.edges : [];

        const currentDraft = state.processDrafts[state.activeProcessId];
        const updatedDraft = currentDraft
          ? {
              ...currentDraft,
              name: parsed.processName || currentDraft.name,
              code: parsed.processCode || currentDraft.code,
              nodes: newNodes,
              edges: newEdges,
            }
          : {
              id: state.activeProcessId,
              name: parsed.processName || 'Proceso Importado',
              code: parsed.processCode || 'PROC-IMPORT',
              version: parsed.version || 'v1 Draft',
              status: 'draft' as const,
              nodes: newNodes,
              edges: newEdges,
            };

        set({
          ...historyUpdates,
          canUndo: true,
          canRedo: false,
          designerNodes: newNodes,
          designerEdges: newEdges,
          selectedNodeId: newNodes[0]?.id || null,
          processDrafts: {
            ...state.processDrafts,
            [state.activeProcessId]: updatedDraft,
          },
        });

        return { success: true };
      } catch (err: any) {
        return { success: false, error: `Error al procesar JSON: ${err.message}` };
      }
    },

    setDesignerNodes: (nodesOrFn) =>
      set((state) => {
        const newNodes = typeof nodesOrFn === 'function' ? nodesOrFn(state.designerNodes) : nodesOrFn;
        const currentDraft = state.processDrafts[state.activeProcessId];
        if (currentDraft) {
          return {
            designerNodes: newNodes,
            processDrafts: {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, nodes: newNodes },
            },
          };
        }
        return { designerNodes: newNodes };
      }),

    setDesignerEdges: (edgesOrFn) =>
      set((state) => {
        const newEdges = typeof edgesOrFn === 'function' ? edgesOrFn(state.designerEdges) : edgesOrFn;
        const currentDraft = state.processDrafts[state.activeProcessId];
        if (currentDraft) {
          return {
            designerEdges: newEdges,
            processDrafts: {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, edges: newEdges },
            },
          };
        }
        return { designerEdges: newEdges };
      }),

    setSelectedNodeId: (id) => set({ selectedNodeId: id }),

    addNodeToDesigner: (type) =>
      set((state) => {
        const historyUpdates = recordHistorySnapshot(state);
        const id = `node-${Date.now()}`;
        const newNode: Node<ActivityNodeData> = {
          id,
          type: 'processNode',
          position: { x: 300 + Math.random() * 80, y: 200 + Math.random() * 80 },
          data: {
            label: `Nueva Actividad (${type})`,
            nodeType: type,
            assignedRole: type === 'human_task' || type === 'approval' ? 'Analista de Operaciones' : undefined,
            slaHours: 24,
            timerConfig: type === 'timer' ? { mode: 'duration', durationValue: 24, durationUnit: 'hours' } : undefined,
            notificationConfig:
              type === 'notification'
                ? { channel: 'email', recipientType: 'initiator', subject: 'Notificación de Avance', bodyTemplate: 'Estimado {{initiator}}, su trámite {{caseId}} avanza.' }
                : undefined,
          },
        };
        const updatedNodes = [...state.designerNodes, newNode];
        const currentDraft = state.processDrafts[state.activeProcessId];

        return {
          ...historyUpdates,
          canUndo: true,
          canRedo: false,
          designerNodes: updatedNodes,
          selectedNodeId: id,
          processDrafts: currentDraft
            ? {
                ...state.processDrafts,
                [state.activeProcessId]: { ...currentDraft, nodes: updatedNodes },
              }
            : state.processDrafts,
        };
      }),

    updateNodeData: (id, patch) =>
      set((state) => {
        const updatedNodes = state.designerNodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
        );
        const currentDraft = state.processDrafts[state.activeProcessId];
        return {
          designerNodes: updatedNodes,
          processDrafts: currentDraft
            ? {
                ...state.processDrafts,
                [state.activeProcessId]: { ...currentDraft, nodes: updatedNodes },
              }
            : state.processDrafts,
        };
      }),

    deleteNode: (id: string) => {
      const state = get();
      const historyUpdates = recordHistorySnapshot(state);
      const updatedNodes = state.designerNodes.filter((n) => n.id !== id);
      const updatedEdges = state.designerEdges.filter((e) => e.source !== id && e.target !== id);
      const currentDraft = state.processDrafts[state.activeProcessId];

      set({
        ...historyUpdates,
        canUndo: true,
        canRedo: false,
        designerNodes: updatedNodes,
        designerEdges: updatedEdges,
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        processDrafts: currentDraft
          ? {
              ...state.processDrafts,
              [state.activeProcessId]: {
                ...currentDraft,
                nodes: updatedNodes,
                edges: updatedEdges,
              },
            }
          : state.processDrafts,
      });
    },

    selectedTaskId: 'TASK-2026-009',
    setSelectedTaskId: (id: string | null) => set({ selectedTaskId: id }),
  };
});
