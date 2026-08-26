import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ProcessDefinition } from '../../types';
import { StatusBadge } from '../shared/StatusBadge';
import { StateWrapper } from '../shared/StateWrapper';
import {
  Workflow,
  Search,
  Plus,
  Layers,
  ArrowRight,
  ShieldCheck,
  FolderOpen,
  X,
  Building,
  Tag,
  FileText,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export const ProcessListView: React.FC = () => {
  const { processes, createProcess, deleteProcess, setActiveTab, setActiveProcessId } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for creating a new process
  const [newProcessName, setNewProcessName] = useState('');
  const [newProcessCode, setNewProcessCode] = useState('');
  const [newProcessCategory, setNewProcessCategory] = useState('Administrativo');
  const [newProcessOwner, setNewProcessOwner] = useState('Dirección de Operaciones');
  const [newProcessDescription, setNewProcessDescription] = useState('');

  const filtered = processes.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDesigner = (processId: string) => {
    setActiveProcessId(processId);
    setActiveTab('designer');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProcessName.trim()) return;

    const generatedCode = newProcessCode.trim()
      ? newProcessCode.trim()
      : 'PROC-' + newProcessName.trim().toUpperCase().replace(/\s+/g, '-').slice(0, 12);

    const newId = createProcess({
      name: newProcessName.trim(),
      code: generatedCode,
      category: newProcessCategory,
      owner: newProcessOwner.trim() || 'Dirección de Procesos',
      description: newProcessDescription.trim() || 'Flujo de trabajo empresarial.',
    });

    // Reset and open directly in designer
    setNewProcessName('');
    setNewProcessCode('');
    setNewProcessDescription('');
    setIsCreateModalOpen(false);
    setActiveProcessId(newId);
    setActiveTab('designer');
  };

  return (
    <StateWrapper mode="success">
      <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-950 text-slate-100">
        {/* Header Title & Create Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Workflow className="w-5 h-5 text-indigo-400" />
              Arquitectura & Catálogo de Procesos
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Definiciones lógicas de negocio, versionado inmutable e instancias ejecutadas.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Diseñar Nuevo Proceso</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por código, nombre o responsable..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium">Categoría:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">Todas las categorías</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Municipal">Municipal</option>
              <option value="Operaciones">Operaciones</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Tecnología">Tecnología</option>
            </select>
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((proc) => (
            <div
              key={proc.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-5 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                        {proc.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{proc.category}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-100 mt-1.5 group-hover:text-indigo-300 transition-colors">
                      {proc.name}
                    </h3>
                  </div>
                  <StatusBadge status={proc.status} />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {proc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono text-slate-300 font-medium">{proc.currentVersion}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-300">{proc.activeInstancesCount} activas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteProcess(proc.id)}
                    title="Eliminar proceso"
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDesigner(proc.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Abrir Diseñador</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version Inmutability Footnote Alert */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          <p>
            <strong className="text-slate-200">Gobernanza de Versionado:</strong> Cada publicación de un proceso genera una nueva <code className="text-indigo-300 font-mono text-[11px]">ProcessVersion</code> inmutable. Las instancias en ejecución permanecen vinculadas a su versión original sin verse alteradas retroactivamente.
          </p>
        </div>

        {/* MODAL: Crear Nuevo Proceso */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-indigo-400" />
                  Crear Nuevo Proceso de Negocio
                </h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nombre del Proceso *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Solicitud de Viáticos y Reembolsos"
                    value={newProcessName}
                    onChange={(e) => {
                      setNewProcessName(e.target.value);
                      if (!newProcessCode) {
                        setNewProcessCode(
                          'PROC-' +
                            e.target.value
                              .toUpperCase()
                              .replace(/[^A-Z0-9]/g, '-')
                              .replace(/-+/g, '-')
                              .slice(0, 14)
                        );
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Código Único (BPM)</label>
                    <input
                      type="text"
                      placeholder="PROC-VIATICOS"
                      value={newProcessCode}
                      onChange={(e) => setNewProcessCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Categoría</label>
                    <select
                      value={newProcessCategory}
                      onChange={(e) => setNewProcessCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Administrativo">Administrativo</option>
                      <option value="Recursos Humanos">Recursos Humanos</option>
                      <option value="Municipal">Municipal</option>
                      <option value="Operaciones">Operaciones</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Tecnología">Tecnología</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Área o Responsable Dueño</label>
                  <input
                    type="text"
                    placeholder="Ej. Dirección Financiera"
                    value={newProcessOwner}
                    onChange={(e) => setNewProcessOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Descripción del Flujo</label>
                  <textarea
                    rows={2}
                    placeholder="Describe el objetivo y alcance del proceso..."
                    value={newProcessDescription}
                    onChange={(e) => setNewProcessDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Crear y Abrir Diseñador</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StateWrapper>
  );
};
