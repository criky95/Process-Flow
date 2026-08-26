import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ProcessRole } from '../../types';
import { UserAvatar } from '../shared/UserAvatar';
import { Search, ChevronRight, Bell, Shield, LogOut } from 'lucide-react';

export const Topbar: React.FC = () => {
  const { currentRole, setRole, activeTab, setCommandPaletteOpen } = useAppStore();
  const { user, logout } = useAuthStore();

  const roles: { value: ProcessRole; label: string }[] = [
    { value: 'architect', label: 'Process Architect (Diseñador)' },
    { value: 'participant', label: 'Participant (Operativo / Tareas)' },
    { value: 'supervisor', label: 'Supervisor (Control & SLAs)' },
    { value: 'process_owner', label: 'Process Owner (KPIs & Métricas)' },
    { value: 'administrator', label: 'Administrator (Plataforma)' },
    { value: 'viewer', label: 'Viewer (Solo lectura)' },
  ];

  const getBreadcrumbTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard de Operaciones';
      case 'processes':
        return 'Arquitectura de Procesos & Definiciones';
      case 'designer':
        return 'Process Designer Visual (@xyflow/react)';
      case 'tasks':
        return 'Bandeja de Tareas (Task Inbox)';
      case 'cases':
        return 'Seguimiento de Instancias & Casos';
      case 'team':
        return 'Supervisión de Carga de Trabajo de Equipo';
      case 'sla':
        return 'SLA Engine & Alertas de Vencimiento';
      case 'analytics':
        return 'Analítica & Análisis de Cuellos de Botella';
      case 'organization':
        return 'Administración de Organización & Tenants';
      case 'users':
        return 'Gestión de Usuarios y Grupos de Trabajo';
      case 'roles':
        return 'Matriz de Permisos RBAC / ABAC';
      case 'audit':
        return 'Sistema de Auditoría Inmutable (Append-only)';
      default:
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between select-none">
      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">ProcessFlow</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-100">{getBreadcrumbTitle(activeTab)}</span>
      </div>

      {/* Action Controls & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Global Search Trigger (Ctrl/Cmd + K) */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs transition-colors group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          <span>Buscar procesos, tareas, casos...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-900 border border-slate-700/60 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Dynamic Role Switcher (UX Persona Selector) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg">
          <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-[11px] text-slate-400 hidden md:inline">Perfil:</span>
          <select
            value={currentRole}
            onChange={(e) => setRole(e.target.value as ProcessRole)}
            className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value} className="bg-slate-900 text-slate-200">
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Icon */}
        <button className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
        </button>

        <div className="h-4 w-[1px] bg-slate-800"></div>

        {/* Active User Avatar & Logout */}
        <div className="flex items-center gap-2">
          <UserAvatar name={user?.name || 'Carlos Mendoza'} role={currentRole} size="sm" />
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

