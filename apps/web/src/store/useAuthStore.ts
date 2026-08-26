import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  tenantCode: string;
  tenantName: string;
  roles: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  error: string | null;
  login: (email: string, password?: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    name: string,
    password?: string,
    tenantCode?: string,
    role?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setRole: (role: string) => void;
  clearError: () => void;
}

const getStoredAuth = () => {
  try {
    const storedUser = localStorage.getItem('pf_user');
    const storedToken = localStorage.getItem('pf_token');
    if (storedUser && storedToken) {
      return {
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        token: storedToken,
      };
    }
  } catch {}
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return `http://${hostname}:3002`;
  }
  return 'http://2.24.209.7:3002';
};

const initialSession = getStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: initialSession.isAuthenticated,
  user: initialSession.user,
  token: initialSession.token,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email: string, password?: string, role: string = 'architect') => {
    set({ error: null });
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || 'Credenciales inválidas o contraseña incorrecta';
        set({ error: errorMsg });
        return { success: false, error: errorMsg };
      }

      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        tenantId: data.user.tenantId,
        tenantCode: data.user.tenantCode,
        tenantName: data.user.tenantName || 'Corp Enterprise Latam',
        roles: [role],
      };

      localStorage.setItem('pf_user', JSON.stringify(user));
      localStorage.setItem('pf_token', data.accessToken);

      set({ isAuthenticated: true, user, token: data.accessToken, error: null });
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.message || 'No se pudo conectar con el servidor de autenticación NestJS';
      set({ error: errorMsg });
      return { success: false, error: errorMsg };
    }
  },

  register: async (
    email: string,
    name: string,
    password?: string,
    tenantCode: string = 'corp-enterprise',
    role: string = 'architect'
  ) => {
    set({ error: null });
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, tenantCode, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || 'Error al registrar usuario en el servidor';
        set({ error: errorMsg });
        return { success: false, error: errorMsg };
      }

      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        tenantId: data.user.tenantId,
        tenantCode: data.user.tenantCode,
        tenantName: data.user.tenantName || `${tenantCode.toUpperCase()} Latam`,
        roles: [role],
      };

      localStorage.setItem('pf_user', JSON.stringify(user));
      localStorage.setItem('pf_token', data.accessToken);

      set({ isAuthenticated: true, user, token: data.accessToken, error: null });
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.message || 'No se pudo conectar con el servidor para registrar el usuario';
      set({ error: errorMsg });
      return { success: false, error: errorMsg };
    }
  },

  logout: () => {
    localStorage.removeItem('pf_user');
    localStorage.removeItem('pf_token');
    set({ isAuthenticated: false, user: null, token: null, error: null });
  },

  setRole: (role: string) =>
    set((state) => {
      const updatedUser = state.user ? { ...state.user, roles: [role] } : null;
      if (updatedUser) {
        localStorage.setItem('pf_user', JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    }),
}));
