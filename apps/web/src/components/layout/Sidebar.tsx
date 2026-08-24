import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ProcessRole } from '../../types';
import {
  LayoutDashboard,
  CheckSquare,
  Workflow,
  FolderGit2,
  FileText,
  Bell,
  Users,
  Clock,
  BarChart3,
  Layers,
  FileCode,
  PlayCircle,
  UploadCloud,
  Building2,
  ShieldCheck,
  Calendar,
  Zap,
  History,
  Settings,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { currentRole, activeTab, setActiveTab } = useAppStore();

  const getNavItems = (role: ProcessRole): NavItem[] => {
    switch (role) {
      case 'participant':
        return [
          { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
          { id: 'tasks', label: 'Mis tareas', icon: CheckSquare, badge: 14 },
          { id: 'processes', label: 'Procesos', icon: Workflow },
          { id: 'cases', label: 'Casos', icon: FolderGit2 },
          { id: 'documents', label: 'Documentos', icon: FileText },
          { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: 3 },
        ];
      case 'supervisor':
        return [
          { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
          { id: 'team', label: 'Equipo', icon: Users },
          { id: 'tasks', label: 'Tareas del Área', icon: CheckSquare, badge: 28 },
          { id: 'processes', label: 'Procesos', icon: Workflow },
          { id: 'cases', label: 'Casos', icon: FolderGit2 },
          { id: 'sla', label: 'SLA & Alertas', icon: Clock, badge: 2 },
          { id: 'analytics', label: 'Analítica', icon: BarChart3 },
        ];
      case 'architect':
        return [
          { id: 'processes', label: 'Procesos', icon: Workflow },
          { id: 'designer', label: 'Diseñador Visual', icon: Layers },
          { id: 'versions', label: 'Versiones', icon: History },
          { id: 'components', label: 'Componentes', icon: SlidersHorizontal },
          { id: 'forms', label: 'Formularios', icon: FileCode },
          { id: 'simulation', label: 'Simulación', icon: PlayCircle },
          { id: 'publications', label: 'Publicaciones', icon: UploadCloud },
        ];
      case 'process_owner':
        return [
          { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
          { id: 'processes', label: 'Mis Procesos', icon: Workflow },
          { id: 'analytics', label: 'Indicadores KPI', icon: BarChart3 },
          { id: 'cases', label: 'Casos Críticos', icon: FolderGit2 },
        ];
      case 'administrator':
        return [
          { id: 'organization', label: 'Organización', icon: Building2 },
          { id: 'users', label: 'Usuarios & Grupos', icon: Users },
          { id: 'roles', label: 'Roles & Permisos', icon: ShieldCheck },
          { id: 'calendars', label: 'Calendarios SLAs', icon: Calendar },
          { id: 'integrations', label: 'Integraciones', icon: Zap },
          { id: 'audit', label: 'Auditoría (Append-only)', icon: History },
          { id: 'settings', label: 'Configuración Global', icon: Settings },
        ];
      case 'viewer':
      default:
        return [
          { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
          { id: 'processes', label: 'Procesos (Lectura)', icon: Eye },
          { id: 'cases', label: 'Consulta de Casos', icon: FolderGit2 },
          { id: 'documents', label: 'Documentos', icon: FileText },
        ];
    }
  };

  const navItems = getNavItems(currentRole);

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 h-screen select-none">
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
          <Workflow className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            ProcessFlow
            <span className="text-[9px] uppercase px-1.5 py-0.2 bg-indigo-950 text-indigo-300 border border-indigo-700/50 rounded font-mono font-semibold">
              BPM
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 leading-none">Platform & Workflow Engine</p>
        </div>
      </div>

      {/* Role Indicator Banner */}
      <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80">
        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1 font-semibold">
          Perfil de Navegación UX
        </div>
        <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5 capitalize">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          {currentRole.replace('_', ' ')}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-indigo-950 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Tenant Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase font-mono">Tenant Activo</span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">Isolated</span>
        </div>
        <div className="font-medium text-slate-200 truncate">Corp Municipal & Enterprise</div>
      </div>
    </aside>
  );
};
