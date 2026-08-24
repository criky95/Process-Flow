import React from 'react';
import { SlaStatus } from '../../types';
import { Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

interface SlaBadgeProps {
  status: SlaStatus;
  remainingText: string;
  showIcon?: boolean;
}

export const SlaBadge: React.FC<SlaBadgeProps> = ({ status, remainingText, showIcon = true }) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-medium text-xs border';

  if (status === 'normal') {
    return (
      <span className={`${baseClasses} bg-emerald-950/30 text-emerald-300 border-emerald-800/40`}>
        {showIcon && <Clock className="w-3.5 h-3.5" />}
        <span>Normal · {remainingText}</span>
      </span>
    );
  }

  if (status === 'at_risk') {
    return (
      <span className={`${baseClasses} bg-amber-950/40 text-amber-300 border-amber-800/50`}>
        {showIcon && <AlertTriangle className="w-3.5 h-3.5" />}
        <span>En Riesgo · {remainingText}</span>
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-rose-950/50 text-rose-300 border-rose-800/60 font-semibold animate-pulse`}>
      {showIcon && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
      <span>Vencido · {remainingText}</span>
    </span>
  );
};
