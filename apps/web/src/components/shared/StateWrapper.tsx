import React from 'react';
import { UIStateMode } from '../../types';
import { ShieldX, AlertTriangle, Inbox, RefreshCw, Loader2 } from 'lucide-react';

interface StateWrapperProps {
  mode: UIStateMode;
  title?: string;
  message?: string;
  onRetry?: () => void;
  children: React.ReactNode;
}

export const StateWrapper: React.FC<StateWrapperProps> = ({
  mode,
  title,
  message,
  onRetry,
  children,
}) => {
  if (mode === 'success') {
    return <>{children}</>;
  }

  if (mode === 'partial_data') {
    return (
      <div className="space-y-3">
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Resiliencia de Datos: Algunos registros se están procesando en segundo plano.</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-2 py-1 bg-amber-900/40 hover:bg-amber-800/50 rounded text-amber-200 border border-amber-700/50 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Actualizar
            </button>
          )}
        </div>
        {children}
      </div>
    );
  }

  if (mode === 'loading') {
    return (
      <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
        <p className="text-sm font-medium text-slate-300">{title || 'Cargando información...'}</p>
        <p className="text-xs text-slate-500 mt-1">{message || 'Por favor espera un momento'}</p>
      </div>
    );
  }

  if (mode === 'empty') {
    return (
      <div className="p-8 rounded-xl border border-dashed border-slate-800 bg-slate-900/20 flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 text-slate-400">
          <Inbox className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">{title || 'Sin registros'}</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">{message || 'No hay elementos disponibles para mostrar en este momento.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors"
          >
            Refrescar
          </button>
        )}
      </div>
    );
  }

  if (mode === 'error') {
    return (
      <div className="p-8 rounded-xl border border-rose-900/50 bg-rose-950/20 flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 rounded-full bg-rose-900/40 flex items-center justify-center mb-3 text-rose-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-rose-200">{title || 'Error de procesamiento'}</h4>
        <p className="text-xs text-rose-300/80 max-w-sm mt-1 mb-4">{message || 'Ocurrió un inconveniente al cargar los datos desde la API del Process Engine.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-rose-900/60 hover:bg-rose-800/80 text-rose-100 rounded text-xs font-medium border border-rose-700/50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reintentar operación
          </button>
        )}
      </div>
    );
  }

  if (mode === 'no_permission') {
    return (
      <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mb-3 text-amber-400">
          <ShieldX className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">{title || 'Acceso Restringido'}</h4>
        <p className="text-xs text-slate-400 max-w-md mt-1 mb-2">
          {message || 'Tu rol actual no dispone de permisos para modificar o acceder a este módulo.'}
        </p>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          HTTP 403 Forbidden · Authorization validated backend-side
        </span>
      </div>
    );
  }

  return <>{children}</>;
};
