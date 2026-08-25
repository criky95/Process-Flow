import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Copy, Check, Upload, FileCode, AlertTriangle } from 'lucide-react';

interface JsonExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonExchangeModal: React.FC<JsonExchangeModalProps> = ({ isOpen, onClose }) => {
  const { exportDraftJSON, importDraftJSON } = useAppStore();
  const [jsonText, setJsonText] = useState(exportDraftJSON());
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const result = importDraftJSON(jsonText);
    if (result.success) {
      setSuccessMessage('¡Esquema JSON importado y reconocido exitosamente en el diseñador!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setErrorMessage(result.error || 'Error al importar el JSON');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/40">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Intercambio JSON (Copiar / Importar Diagrama)</h3>
              <p className="text-[11px] text-slate-400">Inspecciona, copia o pega la definición completa del grafo en formato JSON.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-950/80 border border-rose-800/60 rounded-lg text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800/60 rounded-lg text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">Esquema JSON del Proceso</label>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar JSON'}</span>
              </button>
            </div>
            <textarea
              rows={16}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-indigo-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={handleImport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Cargar & Aplicar JSON en Canvas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
