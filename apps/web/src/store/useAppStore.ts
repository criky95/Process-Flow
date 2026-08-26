import { create } from 'zustand';
import { ProcessRole, ActivityNodeData, NodeType, UserItem, ProcessDefinition, TaskItem } from '../types';
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

const defaultUsers: UserItem[] = [
  {
    id: '9c1f70c2-ccf1-43d0-8a91-808bfb7b56d3',
    name: 'Cristhian Calderon',
    email: 'criky95@live.com',
    role: 'administrator',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'GAD BABAHOYO',
    tenantName: 'GAD Municipal de Babahoyo',
    active: true,
    assignedProcesses: ['proc-1', 'proc-2', 'proc-3', 'proc-4'],
    assignedTasksCount: 0,
    lastActive: 'Ahora mismo',
    department: 'Dirección de TI & Plataforma',
  },
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@processflow.io',
    role: 'architect',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-1', 'proc-2', 'proc-3', 'proc-4'],
    assignedTasksCount: 3,
    lastActive: 'Hace 5 minutos',
    department: 'Arquitectura & Procesos',
  },

  {
    id: 'usr-2',
    name: 'Ana García',
    email: 'ana.garcia@processflow.io',
    role: 'supervisor',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-1', 'proc-3'],
    assignedTasksCount: 7,
    lastActive: 'Hace 12 minutos',
    department: 'Operaciones & SLAs',
  },
  {
    id: 'usr-3',
    name: 'Roberto Díaz',
    email: 'roberto.diaz@processflow.io',
    role: 'participant',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-1'],
    assignedTasksCount: 12,
    lastActive: 'Hace 25 minutos',
    department: 'Compras & Suministros',
  },
  {
    id: 'usr-4',
    name: 'Elena Morales',
    email: 'elena.morales@processflow.io',
    role: 'process_owner',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-1', 'proc-2', 'proc-4'],
    assignedTasksCount: 2,
    lastActive: 'Hace 1 hora',
    department: 'Dirección de Finanzas',
  },
  {
    id: 'usr-5',
    name: 'Admin Central',
    email: 'admin@processflow.io',
    role: 'administrator',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-1', 'proc-2', 'proc-3', 'proc-4'],
    assignedTasksCount: 0,
    lastActive: 'Ahora mismo',
    department: 'Tecnología & Seguridad',
  },
  {
    id: 'usr-6',
    name: 'Valeria Torres',
    email: 'valeria.torres@processflow.io',
    role: 'viewer',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Municipal & Enterprise',
    active: true,
    assignedProcesses: ['proc-3'],
    assignedTasksCount: 0,
    lastActive: 'Ayer a las 18:40',
    department: 'Auditoría Externa',
  },
];

const defaultProcesses: ProcessDefinition[] = [
  {
    id: 'proc-1',
    code: 'PROC-COMPRAS',
    name: 'Compra de Bienes & Suministros',
    description: 'Proceso de aprobación de compras con cotizaciones, aprobación gerencial y orden de compra.',
    category: 'Administrativo',
    owner: 'Dept. Finanzas & Compras',
    currentVersion: 'v3 Published',
    status: 'published',
    updatedAt: '2026-08-20',
    activeInstancesCount: 14,
  },
  {
    id: 'proc-2',
    code: 'PROC-CONTRATACION',
    name: 'Contratación & Onboarding de Personal',
    description: 'Reclutamiento, entrevista técnica, oferta salarial y alta en nómina.',
    category: 'Recursos Humanos',
    owner: 'Talento Humano',
    currentVersion: 'v1 Published',
    status: 'published',
    updatedAt: '2026-08-15',
    activeInstancesCount: 6,
  },
  {
    id: 'proc-3',
    code: 'PROC-LICENCIA-MUNICIPAL',
    name: 'Solicitud de Licencia Municipal',
    description: 'Trámite público de aprobación de uso de suelo y licencia de funcionamiento.',
    category: 'Municipal',
    owner: 'Secretaría de Gobierno',
    currentVersion: 'v4 Draft',
    status: 'draft',
    updatedAt: '2026-08-22',
    activeInstancesCount: 0,
  },
  {
    id: 'proc-4',
    code: 'PROC-MANTENIMIENTO',
    name: 'Mantenimiento Preventivo de Planta',
    description: 'Inspección técnica, solicitud de repuestos y validación de mantenimiento.',
    category: 'Operaciones',
    owner: 'Jefatura de Planta',
    currentVersion: 'v2 Published',
    status: 'published',
    updatedAt: '2026-08-18',
    activeInstancesCount: 22,
  },
];

const defaultTasks: TaskItem[] = [
  {
    id: 'TASK-2026-009',
    caseId: 'PROC-2026-00432',
    processName: 'Compra de Bienes & Suministros v3',
    activityName: 'Revisión Técnica & Presupuesto',
    requester: 'María Torres (Depto. Compras)',
    priority: 'urgent',
    assignedTo: 'Cristhian Calderon',
    assignedRole: 'Analista Técnico',
    createdAt: '2026-08-24 09:30',
    dueDate: '2026-08-25 18:00',
    slaStatus: 'at_risk',
    slaRemainingText: '3 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-014',
    caseId: 'PROC-2026-00418',
    processName: 'Contratación de Personal v1',
    activityName: 'Aprobación Oferta Salarial',
    requester: 'Jorge Morales (RRHH)',
    priority: 'high',
    assignedTo: 'Carlos Mendoza',
    assignedRole: 'Gerente de Área',
    createdAt: '2026-08-23 14:15',
    dueDate: '2026-08-24 12:00',
    slaStatus: 'overdue',
    slaRemainingText: 'Vencida hace 2 h',
    status: 'pending',
  },
  {
    id: 'TASK-2026-021',
    caseId: 'PROC-2026-00445',
    processName: 'Solicitud de Licencia Municipal v4',
    activityName: 'Verificación Documental & Predio',
    requester: 'Ana Beltrán (Trámites)',
    priority: 'medium',
    assignedTo: 'Ana García',
    assignedRole: 'Inspector Municipal',
    createdAt: '2026-08-24 11:00',
    dueDate: '2026-08-26 18:00',
    slaStatus: 'normal',
    slaRemainingText: '48 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-030',
    caseId: 'PROC-2026-00399',
    processName: 'Mantenimiento Preventivo v2',
    activityName: 'Diagnóstico Técnico de Maquinaria',
    requester: 'Jefatura de Operaciones',
    priority: 'low',
    assignedTo: 'Roberto Díaz',
    assignedRole: 'Técnico de Planta',
    createdAt: '2026-08-22 08:00',
    dueDate: '2026-08-27 17:00',
    slaStatus: 'normal',
    slaRemainingText: '72 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-035',
    caseId: 'PROC-2026-00450',
    processName: 'Compra de Bienes & Suministros v3',
    activityName: 'Validación de Cotizaciones Proveedor',
    requester: 'Carlos Mendoza (Compras)',
    priority: 'medium',
    assignedTo: 'Cristhian Calderon',
    assignedRole: 'Analista de Compras',
    createdAt: '2026-08-24 10:15',
    dueDate: '2026-08-25 17:00',
    slaStatus: 'normal',
    slaRemainingText: '24 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-042',
    caseId: 'PROC-2026-00455',
    processName: 'Solicitud de Licencia Municipal v4',
    activityName: 'Inspección de Uso de Suelo',
    requester: 'Roberto Díaz (Urbanismo)',
    priority: 'high',
    assignedTo: 'Ana García',
    assignedRole: 'Perito Urbano',
    createdAt: '2026-08-24 08:00',
    dueDate: '2026-08-24 18:00',
    slaStatus: 'at_risk',
    slaRemainingText: '5 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-048',
    caseId: 'PROC-2026-00460',
    processName: 'Contratación de Personal v1',
    activityName: 'Evaluación Psicométrica y Entrevista',
    requester: 'Elena Morales (RRHH)',
    priority: 'medium',
    assignedTo: 'Elena Morales',
    assignedRole: 'Psicólogo Organizacional',
    createdAt: '2026-08-23 16:30',
    dueDate: '2026-08-28 12:00',
    slaStatus: 'normal',
    slaRemainingText: '3 días restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-053',
    caseId: 'PROC-2026-00462',
    processName: 'Mantenimiento Preventivo v2',
    activityName: 'Calibración de Sensores Industriales',
    requester: 'Jefatura de Planta',
    priority: 'low',
    assignedTo: 'Roberto Díaz',
    assignedRole: 'Instrumentista',
    createdAt: '2026-08-23 09:00',
    dueDate: '2026-08-29 18:00',
    slaStatus: 'normal',
    slaRemainingText: '4 días restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-059',
    caseId: 'PROC-2026-00468',
    processName: 'Compra de Bienes & Suministros v3',
    activityName: 'Firma de Orden de Compra Fiscal',
    requester: 'María Torres (Finanzas)',
    priority: 'urgent',
    assignedTo: 'Cristhian Calderon',
    assignedRole: 'Director de Administración',
    createdAt: '2026-08-24 14:00',
    dueDate: '2026-08-24 17:00',
    slaStatus: 'at_risk',
    slaRemainingText: '2 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-064',
    caseId: 'PROC-2026-00471',
    processName: 'Solicitud de Licencia Municipal v4',
    activityName: 'Emisión de Certificado Ambiental',
    requester: 'Ana Beltrán (Trámites)',
    priority: 'medium',
    assignedTo: 'Ana García',
    assignedRole: 'Técnico Ambiental',
    createdAt: '2026-08-22 11:30',
    dueDate: '2026-08-30 15:00',
    slaStatus: 'normal',
    slaRemainingText: '5 días restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-070',
    caseId: 'PROC-2026-00475',
    processName: 'Contratación de Personal v1',
    activityName: 'Firma de Contrato Laboral y Alta',
    requester: 'Jorge Morales (RRHH)',
    priority: 'high',
    assignedTo: 'Carlos Mendoza',
    assignedRole: 'Especialista Legal Laboral',
    createdAt: '2026-08-24 07:30',
    dueDate: '2026-08-26 12:00',
    slaStatus: 'normal',
    slaRemainingText: '36 h restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-077',
    caseId: 'PROC-2026-00480',
    processName: 'Mantenimiento Preventivo v2',
    activityName: 'Reemplazo de Filtros Hidráulicos',
    requester: 'Técnico de Planta',
    priority: 'low',
    assignedTo: 'Roberto Díaz',
    assignedRole: 'Mecánico Industrial',
    createdAt: '2026-08-21 14:00',
    dueDate: '2026-08-30 18:00',
    slaStatus: 'normal',
    slaRemainingText: '6 días restantes',
    status: 'pending',
  },
  {
    id: 'TASK-2026-082',
    caseId: 'PROC-2026-00485',
    processName: 'Solicitud de Licencia Municipal v4',
    activityName: 'Validación de Pago de Tasa Municipal',
    requester: 'Tesorería Municipal',
    priority: 'urgent',
    assignedTo: 'Cristhian Calderon',
    assignedRole: 'Recaudador Municipal',
    createdAt: '2026-08-24 08:30',
    dueDate: '2026-08-24 13:00',
    slaStatus: 'overdue',
    slaRemainingText: 'Vencida hace 1 h',
    status: 'pending',
  },
  {
    id: 'TASK-2026-090',
    caseId: 'PROC-2026-00490',
    processName: 'Compra de Bienes & Suministros v3',
    activityName: 'Recepción en Bodega y Acta Entrega',
    requester: 'Dept. Almacén & Logística',
    priority: 'medium',
    assignedTo: 'Carlos Mendoza',
    assignedRole: 'Jefe de Bodega',
    createdAt: '2026-08-22 15:00',
    dueDate: '2026-08-29 17:00',
    slaStatus: 'normal',
    slaRemainingText: '4 días restantes',
    status: 'pending',
  },
];




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
  recordSnapshot: () => void;
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

  // Processes & Tasks Global State
  processes: ProcessDefinition[];
  tasks: TaskItem[];
  createProcess: (data: { code: string; name: string; category: string; owner: string; description: string }) => string;
  updateProcess: (id: string, updates: Partial<ProcessDefinition>) => void;
  deleteProcess: (id: string) => void;
  saveDraft: (processId?: string) => void;
  publishVersion: (processId?: string) => { success: boolean; version?: string; error?: string };

  // User Management & Access Control
  users: UserItem[];
  addUser: (user: Omit<UserItem, 'id' | 'lastActive' | 'assignedTasksCount'>) => void;
  updateUser: (id: string, updates: Partial<UserItem>) => void;
  deleteUser: (id: string) => void;
  assignProcessesToUser: (userId: string, processIds: string[]) => void;
  assignTaskToUser: (taskId: string, userId: string) => void;
}



export const useAppStore = create<AppState>((set, get) => {
  const recordHistorySnapshot = (state: AppState): { historyPast: GraphSnapshot[]; historyFuture: GraphSnapshot[] } => {
    const currentSnapshot: GraphSnapshot = {
      nodes: JSON.parse(JSON.stringify(state.designerNodes)),
      edges: JSON.parse(JSON.stringify(state.designerEdges)),
    };
    return {
      historyPast: [...state.historyPast.slice(-19), currentSnapshot],
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

    processes: defaultProcesses,
    tasks: defaultTasks,


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
          canUndo: false,
          canRedo: false,
        };
      }),

    designerNodes: defaultProcessDrafts['proc-1'].nodes,
    designerEdges: defaultProcessDrafts['proc-1'].edges,
    selectedNodeId: 'p1-node-tech-review',

    historyPast: [],
    historyFuture: [],
    canUndo: false,
    canRedo: false,

    recordSnapshot: () =>
      set((state) => {
        const snapshotUpdates = recordHistorySnapshot(state);
        return {
          ...snapshotUpdates,
          canUndo: true,
          canRedo: false,
        };
      }),

    undo: () =>
      set((state) => {
        if (state.historyPast.length === 0) return state;

        const previous = state.historyPast[state.historyPast.length - 1];
        const newPast = state.historyPast.slice(0, state.historyPast.length - 1);
        const currentSnapshot: GraphSnapshot = {
          nodes: JSON.parse(JSON.stringify(state.designerNodes)),
          edges: JSON.parse(JSON.stringify(state.designerEdges)),
        };

        const restoredNodes = JSON.parse(JSON.stringify(previous.nodes));
        const restoredEdges = JSON.parse(JSON.stringify(previous.edges));

        const currentDraft = state.processDrafts[state.activeProcessId];
        const updatedDrafts = currentDraft
          ? {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, nodes: restoredNodes, edges: restoredEdges },
            }
          : state.processDrafts;

        return {
          designerNodes: restoredNodes,
          designerEdges: restoredEdges,
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

        const restoredNodes = JSON.parse(JSON.stringify(next.nodes));
        const restoredEdges = JSON.parse(JSON.stringify(next.edges));

        const currentDraft = state.processDrafts[state.activeProcessId];
        const updatedDrafts = currentDraft
          ? {
              ...state.processDrafts,
              [state.activeProcessId]: { ...currentDraft, nodes: restoredNodes, edges: restoredEdges },
            }
          : state.processDrafts;

        return {
          designerNodes: restoredNodes,
          designerEdges: restoredEdges,
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
      if (!state.designerNodes.some((n) => n.id === id)) return;

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

    // Process Management CRUD & Versioning
    createProcess: (data) => {
      const id = `proc-${Date.now()}`;
      const newProcess: ProcessDefinition = {
        id,
        code: data.code.toUpperCase().trim(),
        name: data.name.trim(),
        category: data.category || 'General',
        owner: data.owner || 'Dirección de Procesos',
        description: data.description || 'Nuevo flujo de trabajo.',
        currentVersion: 'v1 Draft',
        status: 'draft',
        updatedAt: new Date().toISOString().split('T')[0],
        activeInstancesCount: 0,
      };

      const startNodeId = `start-${Date.now()}`;
      const taskNodeId = `task-${Date.now()}`;
      const endNodeId = `end-${Date.now()}`;

      const initialDraft: ProcessDraftData = {
        id,
        name: data.name.trim(),
        code: data.code.toUpperCase().trim(),
        version: 'v1 Draft',
        status: 'draft',
        nodes: [
          {
            id: startNodeId,
            type: 'processNode',
            position: { x: 120, y: 200 },
            data: { label: `Inicio (${data.name})`, nodeType: 'start', description: 'Disparador del trámite' },
          },
          {
            id: taskNodeId,
            type: 'processNode',
            position: { x: 420, y: 200 },
            data: {
              label: 'Revisión Inicial',
              nodeType: 'human_task',
              assignedRole: 'Analista de Operaciones',
              slaHours: 24,
              description: 'Revisión y validación de datos',
            },
          },
          {
            id: endNodeId,
            type: 'processNode',
            position: { x: 740, y: 200 },
            data: { label: 'Fin de Trámite', nodeType: 'end', description: 'Cierre del expediente' },
          },
        ],
        edges: [
          { id: `e1-${Date.now()}`, source: startNodeId, target: taskNodeId, animated: true },
          { id: `e2-${Date.now()}`, source: taskNodeId, target: endNodeId, animated: true },
        ],
      };

      set((state) => ({
        processes: [newProcess, ...state.processes],
        processDrafts: { ...state.processDrafts, [id]: initialDraft },
        activeProcessId: id,
        designerNodes: initialDraft.nodes,
        designerEdges: initialDraft.edges,
        selectedNodeId: startNodeId,
        historyPast: [],
        historyFuture: [],
        canUndo: false,
        canRedo: false,
      }));

      return id;
    },

    updateProcess: (id, updates) =>
      set((state) => {
        const updatedProcesses = state.processes.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        );
        const currentDraft = state.processDrafts[id];
        const updatedDrafts = currentDraft
          ? {
              ...state.processDrafts,
              [id]: {
                ...currentDraft,
                name: updates.name || currentDraft.name,
                code: updates.code || currentDraft.code,
                status: updates.status || currentDraft.status,
              },
            }
          : state.processDrafts;

        return { processes: updatedProcesses, processDrafts: updatedDrafts };
      }),

    deleteProcess: (id) =>
      set((state) => {
        const { [id]: _, ...remainingDrafts } = state.processDrafts;
        return {
          processes: state.processes.filter((p) => p.id !== id),
          processDrafts: remainingDrafts,
        };
      }),

    saveDraft: (processId) => {
      const state = get();
      const targetId = processId || state.activeProcessId;
      const currentDraft = state.processDrafts[targetId];
      if (!currentDraft) return;

      const updatedDraft: ProcessDraftData = {
        ...currentDraft,
        nodes: state.designerNodes,
        edges: state.designerEdges,
      };

      const today = new Date().toISOString().split('T')[0];
      set({
        processDrafts: { ...state.processDrafts, [targetId]: updatedDraft },
        processes: state.processes.map((p) =>
          p.id === targetId ? { ...p, updatedAt: today } : p
        ),
      });
    },

    publishVersion: (processId) => {
      const state = get();
      const targetId = processId || state.activeProcessId;
      const currentDraft = state.processDrafts[targetId];
      if (!currentDraft) return { success: false, error: 'Proceso no encontrado' };

      const currentVersionNum = parseInt(currentDraft.version.replace(/\D/g, '') || '1', 10);
      const nextVersionStr = `v${currentVersionNum + 1} Published`;

      const updatedDraft: ProcessDraftData = {
        ...currentDraft,
        version: nextVersionStr,
        status: 'published',
        nodes: state.designerNodes,
        edges: state.designerEdges,
      };

      const today = new Date().toISOString().split('T')[0];
      set({
        processDrafts: { ...state.processDrafts, [targetId]: updatedDraft },
        processes: state.processes.map((p) =>
          p.id === targetId
            ? { ...p, status: 'published', currentVersion: nextVersionStr, updatedAt: today }
            : p
        ),
      });

      return { success: true, version: nextVersionStr };
    },

    selectedTaskId: 'TASK-2026-009',
    setSelectedTaskId: (id: string | null) => set({ selectedTaskId: id }),

    // Users & Roles State
    users: defaultUsers,

    addUser: (userData) =>
      set((state) => ({
        users: [
          ...state.users,
          {
            ...userData,
            id: `usr-${Date.now()}`,
            lastActive: 'Recién creado',
            assignedTasksCount: 0,
          },
        ],
      })),

    updateUser: (id, updates) =>
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
      })),

    deleteUser: (id) =>
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      })),

    assignProcessesToUser: (userId, processIds) =>
      set((state) => ({
        users: state.users.map((u) =>
          u.id === userId ? { ...u, assignedProcesses: processIds } : u
        ),
      })),

    assignTaskToUser: (taskId, userId) =>
      set((state) => {
        const targetUser = state.users.find((u) => u.id === userId);
        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                assignedTo: targetUser ? targetUser.name : t.assignedTo,
                assignedRole: targetUser ? targetUser.role : t.assignedRole,
              }
            : t
        );
        return {
          tasks: updatedTasks,
          users: state.users.map((u) =>
            u.id === userId
              ? { ...u, assignedTasksCount: u.assignedTasksCount + 1 }
              : u
          ),
        };
      }),
  };
});


