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
          description: 'Autorización de partida presupuestaria',
        },
      },
      {
        id: 'p1-node-end',
        type: 'processNode',
        position: { x: 1200, y: 180 },
        data: {
          label: 'Orden Generada & Cierre',
          nodeType: 'end',
          description: 'Finalización exitosa del proceso',
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
    name: 'Contratación & Onboarding de Personal',
    code: 'PROC-CONTRATACION',
    version: 'v1 Published',
    status: 'published',
    nodes: [
      {
        id: 'p2-node-start',
        type: 'processNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'Recepción Solicitud RRHH',
          nodeType: 'start',
          description: 'Apertura de vacante laboral',
        },
      },
      {
        id: 'p2-node-interview',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Entrevista & Evaluación',
          nodeType: 'human_task',
          assignedRole: 'Reclutador Senior',
          slaHours: 72,
          description: 'Evaluación técnica y psicotécnica del candidato',
        },
      },
      {
        id: 'p2-node-offer-approval',
        type: 'processNode',
        position: { x: 640, y: 180 },
        data: {
          label: 'Aprobación Oferta Salarial',
          nodeType: 'approval',
          assignedRole: 'Director de RRHH',
          slaHours: 24,
          description: 'Firma de propuesta económica',
        },
      },
      {
        id: 'p2-node-onboarding-form',
        type: 'processNode',
        position: { x: 920, y: 180 },
        data: {
          label: 'Alta en Nómina & Accesos',
          nodeType: 'form',
          assignedRole: 'Analista de Nómina',
          slaHours: 12,
          description: 'Carga de datos contractuales e IT',
        },
      },
      {
        id: 'p2-node-end',
        type: 'processNode',
        position: { x: 1200, y: 180 },
        data: {
          label: 'Contratación Exitosa',
          nodeType: 'end',
          description: 'Empleado incorporado al equipo',
        },
      },
    ],
    edges: [
      { id: 'p2-e1', source: 'p2-node-start', target: 'p2-node-interview', animated: true },
      { id: 'p2-e2', source: 'p2-node-interview', target: 'p2-node-offer-approval', animated: true },
      { id: 'p2-e3', source: 'p2-node-offer-approval', target: 'p2-node-onboarding-form', animated: true },
      { id: 'p2-e4', source: 'p2-node-onboarding-form', target: 'p2-node-end', animated: true },
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
          label: 'Ingreso de Expediente',
          nodeType: 'start',
          description: 'Ciudadano ingresa trámite municipal',
        },
      },
      {
        id: 'p3-node-inspection',
        type: 'processNode',
        position: { x: 360, y: 180 },
        data: {
          label: 'Inspección Zonal & Suelo',
          nodeType: 'human_task',
          assignedRole: 'Inspector de Urbanismo',
          slaHours: 96,
          description: 'Verificación física del predio',
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

interface AppState {
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
}

export const useAppStore = create<AppState>((set, get) => ({
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
      };
    }),
  
  designerNodes: defaultProcessDrafts['proc-1'].nodes,
  designerEdges: defaultProcessDrafts['proc-1'].edges,
  selectedNodeId: 'p1-node-tech-review',
  
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
        },
      };
      const updatedNodes = [...state.designerNodes, newNode];
      const currentDraft = state.processDrafts[state.activeProcessId];
      
      return {
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
}));
