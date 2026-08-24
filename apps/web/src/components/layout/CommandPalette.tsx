import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Search, Workflow, FileText, CheckSquare, FolderGit2, X, Command } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveTab, setActiveProcessId } =
    useAppStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const items = [
    { id: '1', title: 'Compra de bienes v3', category: 'Procesos', type: 'process', tab: 'processes' },
    { id: '2', title: 'Contratación de personal v1', category: 'Procesos', type: 'process', tab: 'processes' },
    { id: '3', title: 'TASK-2026-009: Revisión de cotizaciones', category: 'Tareas', type: 'task', tab: 'tasks' },
    { id: '4', title: 'CASE-2026-00432: Solicitud de Licencia Municipal', category: 'Casos', type: 'case', tab: 'cases' },
    { id: '5', title: 'EXP-402: Título de propiedad adjunto', category: 'Documentos', type: 'document', tab: 'documents' },
  ];

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: string) => {
    setActiveTab(tab);
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Buscar procesos, casos, tareas, documentos o comandos... (Esc para salir)"
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No se encontraron coincidencias para "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.tab)}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-800 border border-slate-700/50 text-slate-300 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                    {item.type === 'process' && <Workflow className="w-4 h-4" />}
                    {item.type === 'task' && <CheckSquare className="w-4 h-4" />}
                    {item.type === 'case' && <FolderGit2 className="w-4 h-4" />}
                    {item.type === 'document' && <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-slate-200 group-hover:text-white">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-slate-500">{item.category}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                  Navegar ↵
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Command className="w-3 h-3 text-slate-400" />
            <span>Navegación global rápida</span>
          </div>
          <span>Pulsar <strong>Esc</strong> para cerrar</span>
        </div>
      </div>
    </div>
  );
};
