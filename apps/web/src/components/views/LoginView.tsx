import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { ProcessRole } from '../../types';
import { ShieldCheck, Database, KeyRound, ArrowRight, UserPlus, LogIn, Building2, User } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, register, error, clearError } = useAuthStore();
  const { setRole, setActiveTab } = useAppStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('carlos.mendoza@processflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('');
  const [tenantCode, setTenantCode] = useState('corp-enterprise');
  const [selectedRole, setSelectedRoleState] = useState<ProcessRole>('architect');
  const [loading, setLoading] = useState(false);

  const handleTabSwitch = (newMode: 'login' | 'register') => {
    clearError();
    setMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      let res;
      if (mode === 'login') {
        res = await login(email, password, selectedRole);
      } else {
        res = await register(email, fullName, password, tenantCode, selectedRole);
      }

      if (res.success) {
        setRole(selectedRole);
        setActiveTab('dashboard');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            Supabase PostgreSQL Engine
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 font-bold text-xl">
              P
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">ProcessFlow</h1>
          </div>
          <p className="text-xs text-slate-400">Plataforma Empresarial de Workflows & Gestión Multi-Tenant</p>
        </div>

        {/* Auth Mode Tabs (Login / Register Switcher) */}
        <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 mb-6">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('register')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Crear Cuenta
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs flex items-center gap-2">
            <span>⚠️ {error}</span>
          </div>
        )}


        {/* Login / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nombre Completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={mode === 'register'}
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pl-9"
                  placeholder="Carlos Mendoza"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="usuario@organizacion.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pr-10"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Código de Organización (Tenant Code)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tenantCode}
                  onChange={(e) => setTenantCode(e.target.value)}
                  required={mode === 'register'}
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pl-9 font-mono text-xs"
                  placeholder="corp-enterprise"
                />
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Rol de Acceso UX
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRoleState(e.target.value as ProcessRole)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <option value="architect">Process Architect (Diseñador)</option>
              <option value="participant">Participant (Ejecutor de Tareas)</option>
              <option value="supervisor">Supervisor (SLA & Auditoría)</option>
              <option value="process_owner">Process Owner (Responsable)</option>
              <option value="administrator">Administrator (Tenant & Global)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tenant Information Footer */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{mode === 'register' ? tenantCode : 'Corp Enterprise Latam'}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RLS Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
