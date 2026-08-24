import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, FileEdit, Archive, RotateCcw } from 'lucide-react';

interface StatusBadgeProps {
  status: 'draft' | 'published' | 'archived' | 'pending' | 'in_progress' | 'completed' | 'returned';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const baseClasses = `inline-flex items-center gap-1.5 font-medium rounded-md border ${
    isSm ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
  }`;

  switch (status) {
    case 'published':
      return (
        <span className={`${baseClasses} bg-emerald-950/40 text-emerald-400 border-emerald-800/50`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          Publicado
        </span>
      );
    case 'draft':
      return (
        <span className={`${baseClasses} bg-amber-950/40 text-amber-400 border-amber-800/50`}>
          <FileEdit className="w-3.5 h-3.5" />
          Borrador
        </span>
      );
    case 'archived':
      return (
        <span className={`${baseClasses} bg-slate-900 text-slate-400 border-slate-700/50`}>
          <Archive className="w-3.5 h-3.5" />
          Archivado
        </span>
      );
    case 'in_progress':
    case 'pending':
      return (
        <span className={`${baseClasses} bg-blue-950/40 text-blue-400 border-blue-800/50`}>
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          En progreso
        </span>
      );
    case 'completed':
      return (
        <span className={`${baseClasses} bg-emerald-950/40 text-emerald-400 border-emerald-800/50`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completada
        </span>
      );
    case 'returned':
      return (
        <span className={`${baseClasses} bg-rose-950/40 text-rose-400 border-rose-800/50`}>
          <RotateCcw className="w-3.5 h-3.5" />
          Devuelta
        </span>
      );
    default:
      return null;
  }
};
