import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ProcessRole, UserItem } from '../../types';
import { UserAvatar } from '../shared/UserAvatar';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  Briefcase,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Edit2,
  FolderPlus,
  CheckSquare,
  Trash2,
  Layers,
  Clock,
  Building,
  Key,
  X,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const UsersManagementView: React.FC = () => {
  const {
    users,
    processes,
    tasks,
    addUser,
    updateUser,
    deleteUser,
    assignProcessesToUser,
    assignTaskToUser,
    setActiveTab,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [assigningProjectsUser, setAssigningProjectsUser] = useState<UserItem | null>(null);
  const [assigningTaskUser, setAssigningTaskUser] = useState<UserItem | null>(null);

  // Form states for creating a user
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<ProcessRole>('participant');
  const [newUserDept, setNewUserDept] = useState('Operaciones');
  const [newUserPassword, setNewUserPassword] = useState('processflow2026');

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && u.active) ||
      (statusFilter === 'inactive' && !u.active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeStyle = (role: ProcessRole) => {
    switch (role) {
      case 'administrator':
        return 'bg-rose-950/80 text-rose-300 border-rose-700/60';
      case 'architect':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60';
      case 'supervisor':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'participant':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'process_owner':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'viewer':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      department: newUserDept,
      tenantId: 'tenant-corp-enterprise',
      tenantCode: 'corp-enterprise',
      tenantName: 'Corp Municipal & Enterprise',
      active: true,
      assignedProcesses: ['proc-1'],
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('participant');
    setNewUserDept('Operaciones');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-950 text-slate-100 pb-28">
      {/* Top Header */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Gestión de Usuarios & Control de Acceso
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  RBAC Activo
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Administración de identidades, roles de permisos, aislamiento de tenant y asignación de proyectos.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invitar / Nuevo Usuario</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Total Usuarios</span>
            <div className="text-2xl font-bold text-white mt-1">{users.length}</div>
            <span className="text-[11px] text-emerald-400 font-medium">100% aislados por tenant</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Administradores & Arq.</span>
            <div className="text-2xl font-bold text-rose-300 mt-1">
              {users.filter((u) => u.role === 'administrator' || u.role === 'architect').length}
            </div>
            <span className="text-[11px] text-slate-400">Permiso de configuración y modelado</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Supervisores & Operativos</span>
            <div className="text-2xl font-bold text-emerald-300 mt-1">
              {users.filter((u) => u.role === 'supervisor' || u.role === 'participant').length}
            </div>
            <span className="text-[11px] text-slate-400">Ejecución y gestión de trámites</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Tareas Activas Asignadas</span>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              {users.reduce((acc, u) => acc + (u.assignedTasksCount || 0), 0)}
            </div>
            <span className="text-[11px] text-amber-400/90 font-medium">Bajo control de SLA</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo electrónico o departamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">Todos los Roles</option>
              <option value="administrator" className="bg-slate-900">Administrador</option>
              <option value="architect" className="bg-slate-900">Arquitecto</option>
              <option value="supervisor" className="bg-slate-900">Supervisor</option>
              <option value="participant" className="bg-slate-900">Participante</option>
              <option value="process_owner" className="bg-slate-900">Dueño de Proceso</option>
              <option value="viewer" className="bg-slate-900">Lector</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">Todos los Estados</option>
              <option value="active" className="bg-slate-900">Solo Activos</option>
              <option value="inactive" className="bg-slate-900">Solo Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Usuario</th>
                <th className="py-3 px-4">Rol & Permisos</th>
                <th className="py-3 px-4">Departamento</th>
                <th className="py-3 px-4">Procesos Asignados</th>
                <th className="py-3 px-4 text-center">Tareas</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* User info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={u.name} role={u.role} size="md" />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${getRoleBadgeStyle(
                        u.role
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {u.department || 'General'}
                  </td>

                  {/* Assigned Processes */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap items-center gap-1.5 max-w-[280px]">
                      {u.assignedProcesses && u.assignedProcesses.length > 0 ? (
                        u.assignedProcesses.map((procId) => {
                          const proc = processes.find((p) => p.id === procId);
                          return (
                            <span
                              key={procId}
                              className="px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded text-[10px] font-medium"
                            >
                              {proc ? proc.code : procId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">Sin asignar</span>
                      )}
                      <button
                        onClick={() => setAssigningProjectsUser(u)}
                        title="Gestionar proyectos asignados"
                        className="p-1 text-indigo-400 hover:bg-indigo-950/60 rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Active Tasks count */}
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold text-[11px]">
                      {u.assignedTasksCount}
                    </span>
                  </td>

                  {/* Active Status */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => updateUser(u.id, { active: !u.active })}
                      className="cursor-pointer"
                      title={u.active ? 'Hacer clic para desactivar' : 'Hacer clic para activar'}
                    >
                      {u.active ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 font-medium text-[11px]">
                          <XCircle className="w-3.5 h-3.5" /> Inactivo
                        </span>
                      )}
                    </button>
                  </td>

                  {/* Actions buttons */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setAssigningProjectsUser(u)}
                        title="Asignar Proyectos / Procesos"
                        className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <FolderPlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setAssigningTaskUser(u)}
                        title="Asignar o Transferir Tareas"
                        className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingUser(u)}
                        title="Editar Usuario & Rol"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        title="Eliminar usuario"
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Crear / Invitar Usuario */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                Invitar / Registrar Nuevo Usuario
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
                <label className="block text-slate-400 font-medium mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sofía Ramírez"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="sofia.ramirez@processflow.io"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Rol en ProcessFlow</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as ProcessRole)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500 capitalize"
                  >
                    <option value="participant">Participant</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="architect">Architect</option>
                    <option value="process_owner">Process Owner</option>
                    <option value="administrator">Administrator</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Departamento</label>
                  <input
                    type="text"
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Contraseña Inicial</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-lg text-[11px] text-indigo-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                <span>
                  El usuario se integrará bajo las políticas de aislamiento de tenant de <strong>Corp Municipal & Enterprise</strong>.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Editar Usuario & Rol */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-indigo-400" />
                Editar Usuario & Rol
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Rol Asignado</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as ProcessRole })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500 capitalize"
                  >
                    <option value="administrator">Administrator</option>
                    <option value="architect">Architect</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="participant">Participant</option>
                    <option value="process_owner">Process Owner</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Departamento</label>
                  <input
                    type="text"
                    value={editingUser.department || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Estado de Acceso</label>
                <div className="flex items-center gap-3 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={editingUser.active}
                      onChange={() => setEditingUser({ ...editingUser, active: true })}
                      className="accent-indigo-500"
                    />
                    <span className="text-emerald-400 font-semibold">Activo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={!editingUser.active}
                      onChange={() => setEditingUser({ ...editingUser, active: false })}
                      className="accent-rose-500"
                    />
                    <span className="text-slate-400">Inactivo</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateUser(editingUser.id, editingUser);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Asignar Proyectos / Procesos */}
      {assigningProjectsUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-indigo-400" />
                  Asignar Procesos a {assigningProjectsUser.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selecciona los flujos y procesos a los que este usuario tendrá autorización.
                </p>
              </div>
              <button
                onClick={() => setAssigningProjectsUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {processes.map((proc) => {
                const isSelected = assigningProjectsUser.assignedProcesses?.includes(proc.id);
                return (
                  <label
                    key={proc.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-700 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const current = assigningProjectsUser.assignedProcesses || [];
                          const updated = isSelected
                            ? current.filter((id) => id !== proc.id)
                            : [...current, proc.id];
                          setAssigningProjectsUser({
                            ...assigningProjectsUser,
                            assignedProcesses: updated,
                          });
                        }}
                        className="accent-indigo-500 w-4 h-4 rounded"
                      />
                      <div>
                        <div className="font-semibold text-xs text-white">{proc.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{proc.code} • {proc.category}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {proc.currentVersion}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAssigningProjectsUser(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  assignProcessesToUser(
                    assigningProjectsUser.id,
                    assigningProjectsUser.assignedProcesses || []
                  );
                  setAssigningProjectsUser(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
              >
                Guardar Asignaciones
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Asignar Tareas Abiertas */}
      {assigningTaskUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-400" />
                  Asignar Tarea a {assigningTaskUser.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Transfiere una actividad operativa pendiente para su ejecución.
                </p>
              </div>
              <button
                onClick={() => setAssigningTaskUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {tasks
                .filter((t) => t.status === 'pending' || t.status === 'in_progress')
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        {task.activityName}
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {task.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Proceso: <span className="text-slate-300">{task.processName}</span> • Asignado actual:{' '}
                        <span className="text-amber-400">{task.assignedTo}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        assignTaskToUser(task.id, assigningTaskUser.id);
                        setAssigningTaskUser(null);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer"
                    >
                      Asignar
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAssigningTaskUser(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
