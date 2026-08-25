export type ProcessRole =
  | 'architect'
  | 'participant'
  | 'supervisor'
  | 'process_owner'
  | 'administrator'
  | 'viewer';

export type NodeType =
  | 'start'
  | 'human_task'
  | 'approval'
  | 'decision'
  | 'parallel'
  | 'timer'
  | 'document'
  | 'form'
  | 'notification'
  | 'signature'
  | 'subprocess'
  | 'end';

export type SlaStatus = 'normal' | 'at_risk' | 'overdue';

export interface ProcessDefinition {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  currentVersion: string;
  status: 'draft' | 'published' | 'archived';
  updatedAt: string;
  activeInstancesCount: number;
}

export interface TaskItem {
  id: string;
  caseId: string;
  processName: string;
  activityName: string;
  requester: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  assignedRole: string;
  createdAt: string;
  dueDate: string;
  slaStatus: SlaStatus;
  slaRemainingText: string;
  status: 'pending' | 'in_progress' | 'completed' | 'returned';
}

export interface TimerConfig {
  mode: 'duration' | 'fixed_date' | 'webhook_event';
  durationValue?: number;
  durationUnit?: 'minutes' | 'hours' | 'days';
  fixedDate?: string;
  eventName?: string;
}

export interface NotificationConfig {
  channel: 'email' | 'whatsapp' | 'sms' | 'in_app';
  recipientType: 'initiator' | 'assignee' | 'role' | 'dynamic_email';
  recipientValue?: string;
  subject?: string;
  bodyTemplate?: string;
}

export interface DecisionCondition {
  id: string;
  variable: string;
  operator: 'gt' | 'lt' | 'eq' | 'neq' | 'contains';
  value: string;
  outcomeLabel: string;
}

export interface SignatureConfig {
  level: 'simple' | 'pki_certificate' | 'sms_otp' | 'biometric';
  documentTitle?: string;
}

export interface SubprocessConfig {
  targetProcessCode?: string;
}

export interface ActivityNodeData extends Record<string, unknown> {
  label: string;
  nodeType: NodeType;
  assignedRole?: string;
  assignedUser?: string;
  slaHours?: number;
  description?: string;
  requiredDocuments?: string[];
  formSchemaId?: string;
  rulesCount?: number;

  // Specific node type parameters
  timerConfig?: TimerConfig;
  notificationConfig?: NotificationConfig;
  decisionConditions?: DecisionCondition[];
  signatureConfig?: SignatureConfig;
  subprocessConfig?: SubprocessConfig;
}

export type UIStateMode =
  | 'success'
  | 'loading'
  | 'empty'
  | 'error'
  | 'no_permission'
  | 'partial_data';
