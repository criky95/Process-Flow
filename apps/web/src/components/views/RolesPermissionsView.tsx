import React from 'react';
import { ProcessRole } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Layers,
  Users,
  Eye,
  CheckSquare,
  Clock,
  BarChart3,
  Lock,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface PermissionRow {
  category: string;
  action: string;
  description: string;
  admin: boolean;
  architect: boolean;
  supervisor: boolean;
  participant: boolean;
  owner: boolean;
  viewer: boolean;
}

const permissionsMatrix: PermissionRow[] = [
  // 1. Diseño & Modelado
  {
    category: 'Diseño & Modelado',
    action: 'Crear nuevos procesos en borrador',
    description: 'Permite iniciar la definición de un nuevo flujo de trabajo.',
    admin: true,
    architect: true,
    supervisor: false,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Diseño & Modelado',
    action: 'Modificar nodos y reglas en el Diseñador Visual',
    description: 'Arrastrar nodos, configurar compuertas de decisión, SLAs y timers.',
    admin: true,
    architect: true,
    supervisor: false,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Diseño & Modelado',
    action: 'Publicar versión inmutable (Release)',
    description: 'Congela el schema JSON y genera una versión mayor/menor oficial.',
    admin: true,
    architect: true,
    supervisor: false,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Diseño & Modelado',
    action: 'Simular ejecución de flujos',
    description: 'Probar caminos lógicos y compuertas antes de publicar.',
    admin: true,
    architect: true,
    supervisor: true,
    participant: false,
    owner: true,
    viewer: false,
  },

  // 2. Ejecución & Operación
  {
    category: 'Ejecución & Trámites',
    action: 'Iniciar nuevas instancias de trámites (Casos)',
    description: 'Completar el formulario de inicio y disparar el workflow.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: true,
    owner: true,
    viewer: false,
  },
  {
    category: 'Ejecución & Trámites',
    action: 'Completar tareas asignadas a su usuario o rol',
    description: 'Llenar datos, adjuntar documentos y aprobar/rechazar pasos.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: true,
    owner: false,
    viewer: false,
  },
  {
    category: 'Ejecución & Trámites',
    action: 'Reasignar tareas entre miembros del equipo',
    description: 'Transferir una actividad a otro operador por sobrecarga o ausencia.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Ejecución & Trámites',
    action: 'Cancelar o suspender instancias de casos',
    description: 'Detener un caso en ejecución ante excepciones críticas.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: false,
    owner: true,
    viewer: false,
  },

  // 3. Monitoreo & Supervisión
  {
    category: 'Monitoreo & SLAs',
    action: 'Ver Dashboard de SLAs y Cuellos de Botella',
    description: 'Monitoreo de tareas vencidas y tiempos promedio de ciclo.',
    admin: true,
    architect: true,
    supervisor: true,
    participant: false,
    owner: true,
    viewer: true,
  },
  {
    category: 'Monitoreo & SLAs',
    action: 'Consultar bitácora de auditoría (Append-only)',
    description: 'Registro forense inmutable de eventos con timestamp y actor.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: false,
    owner: true,
    viewer: true,
  },

  // 4. Administración & Gobierno
  {
    category: 'Administración Global',
    action: 'Gestión de Usuarios (Crear, Editar, Desactivar)',
    description: 'Control de accesos y asignación de perfiles RBAC.',
    admin: true,
    architect: false,
    supervisor: false,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Administración Global',
    action: 'Asignar Proyectos y Permisos a Usuarios',
    description: 'Vincular qué usuarios tienen acceso a qué procesos específicos.',
    admin: true,
    architect: false,
    supervisor: true,
    participant: false,
    owner: false,
    viewer: false,
  },
  {
    category: 'Administración Global',
    action: 'Configurar Calendarios Laborales & Feriados SLA',
    description: 'Horarios de atención para el cálculo preciso de horas hábiles.',
    admin: true,
    architect: false,
    supervisor: false,
    participant: false,
    owner: false,
    viewer: false,
  },
];

export const RolesPermissionsView: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Matriz de Permisos por Rol (RBAC)
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              Seguridad & Gobernanza
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Reglas de autorización estrictas por perfil. El Administrador tiene control total sobre la plataforma y cada rol mantiene sus atribuciones específicas.
          </p>
        </div>
      </div>

      {/* Role Summary Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-slate-900 border border-rose-800/50 rounded-xl">
          <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            Administrator
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Control total de usuarios, roles, procesos, SLAs y auditoría.
          </p>
        </div>

        <div className="p-3.5 bg-slate-900 border border-indigo-800/50 rounded-xl">
          <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Architect
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Diseño de diagramas de flujo, control de versiones y publicación.
          </p>
        </div>

        <div className="p-3.5 bg-slate-900 border border-amber-800/50 rounded-xl">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Supervisor
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Supervisión de SLAs del área, reasignación de tareas y alertas.
          </p>
        </div>

        <div className="p-3.5 bg-slate-900 border border-emerald-800/50 rounded-xl">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
            Participant
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Bandeja de tareas asignadas, ingreso de datos y radicación.
          </p>
        </div>

        <div className="p-3.5 bg-slate-900 border border-purple-800/50 rounded-xl">
          <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            Process Owner
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Indicadores KPI de negocio, cuellos de botella y optimización.
          </p>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            Viewer
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Consulta de procesos y casos en modalidad de solo lectura.
          </p>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 w-1/3">Acción / Capacidad del Sistema</th>
                <th className="py-3 px-3 text-center text-rose-300">Admin</th>
                <th className="py-3 px-3 text-center text-indigo-300">Architect</th>
                <th className="py-3 px-3 text-center text-amber-300">Supervisor</th>
                <th className="py-3 px-3 text-center text-emerald-300">Participant</th>
                <th className="py-3 px-3 text-center text-purple-300">Owner</th>
                <th className="py-3 px-3 text-center text-slate-400">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {permissionsMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{p.action}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{p.description}</div>
                    <span className="inline-block mt-1 text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {p.category}
                    </span>
                  </td>

                  {/* Admin */}
                  <td className="py-3 px-3 text-center">
                    {p.admin ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Architect */}
                  <td className="py-3 px-3 text-center">
                    {p.architect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Supervisor */}
                  <td className="py-3 px-3 text-center">
                    {p.supervisor ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Participant */}
                  <td className="py-3 px-3 text-center">
                    {p.participant ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Owner */}
                  <td className="py-3 px-3 text-center">
                    {p.owner ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Viewer */}
                  <td className="py-3 px-3 text-center">
                    {p.viewer ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
