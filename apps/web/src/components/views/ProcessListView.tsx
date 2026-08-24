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
  FileCheck2,
  FolderOpen,
} from 'lucide-react';

export const ProcessListView: React.FC = () => {
  const { setActiveTab, setActiveProcessId } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const processes: ProcessDefinition[] = [
    {
      id: 'proc-1',
      code: 'PROC-COMPRAS',
      name: 'Compra de Bienes & Suministros',
      description:
        'Proceso de aprobación de compras con cotizaciones, aprobación gerencial y orden de compra.',
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
      owner: 'Dirección de Urbanismo',
      currentVersion: 'v4 Draft',
      status: 'draft',
      updatedAt: '2026-08-24',
      activeInstancesCount: 0,
    },
    {
      id: 'proc-4',
      code: 'PROC-MANTENIMIENTO',
      name: 'Mantenimiento Preventivo de Planta',
      description: 'Inspección técnica, solicitud de repuestos y validación de mantenimiento.',
      category: 'Operaciones',
      owner: 'Jefatura de Operaciones',
      currentVersion: 'v2 Published',
      status: 'published',
      updatedAt: '2026-07-30',
      activeInstancesCount: 22,
    },
  ];

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

  return (
    <StateWrapper mode="success">
      <div className="h-full overflow-y-auto p-6 space-y-6">
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
            onClick={() => handleOpenDesigner('proc-new')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0"
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

                <button
                  onClick={() => handleOpenDesigner(proc.id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <span>Abrir Diseñador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
      </div>
    </StateWrapper>
  );
};
