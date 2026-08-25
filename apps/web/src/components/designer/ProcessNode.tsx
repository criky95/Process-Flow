import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { ActivityNodeData, NodeType } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import {
  Play,
  UserCheck,
  CheckSquare,
  GitFork,
  Split,
  Clock,
  FileText,
  FileCode,
  Bell,
  FileSignature,
  Boxes,
  Flag,
  Trash2,
} from 'lucide-react';

export type ProcessNodeType = Node<ActivityNodeData, 'processNode'>;

export const ProcessNode: React.FC<NodeProps<ProcessNodeType>> = ({ id, data, selected }) => {
  const { deleteNode } = useAppStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'start':
        return <Play className="w-3.5 h-3.5 text-emerald-400" />;
      case 'human_task':
        return <UserCheck className="w-3.5 h-3.5 text-blue-400" />;
      case 'approval':
        return <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />;
      case 'decision':
        return <GitFork className="w-3.5 h-3.5 text-amber-400" />;
      case 'parallel':
        return <Split className="w-3.5 h-3.5 text-purple-400" />;
      case 'timer':
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
      case 'form':
        return <FileCode className="w-3.5 h-3.5 text-emerald-400" />;
      case 'notification':
        return <Bell className="w-3.5 h-3.5 text-yellow-400" />;
      case 'signature':
        return <FileSignature className="w-3.5 h-3.5 text-rose-400" />;
      case 'subprocess':
        return <Boxes className="w-3.5 h-3.5 text-indigo-400" />;
      case 'end':
        return <Flag className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getBorderColor = (type: NodeType) => {
    if (selected) return 'border-indigo-400 ring-2 ring-indigo-500/40';
    switch (type) {
      case 'start':
        return 'border-emerald-700/60 bg-emerald-950/20';
      case 'decision':
        return 'border-amber-700/60 bg-amber-950/20';
      case 'end':
        return 'border-rose-700/60 bg-rose-950/20';
      default:
        return 'border-slate-700/80 bg-slate-900/90';
    }
  };

  return (
    <div
      className={`min-w-[180px] max-w-[220px] rounded-lg border shadow-xl p-3 select-none backdrop-blur-md transition-all group/node relative ${getBorderColor(
        data.nodeType
      )}`}
    >
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-slate-900" />

      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded bg-slate-800/80 border border-slate-700/50 shrink-0">
            {getNodeIcon(data.nodeType)}
          </div>
          <h4 className="text-xs font-semibold text-slate-100 truncate leading-snug">
            {data.label}
          </h4>
        </div>

        <button
          onClick={handleDelete}
          className="opacity-0 group-hover/node:opacity-100 p-1 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded transition-all shrink-0"
          title="Eliminar este nodo"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {data.assignedRole && (
        <div className="text-[11px] text-slate-300 font-medium truncate mt-1">
          👤 {data.assignedRole}
        </div>
      )}

      {data.slaHours && (
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
          ⏱ SLA: {data.slaHours}h
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-slate-900" />
    </div>
  );
};
