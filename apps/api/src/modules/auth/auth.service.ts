import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface LoginDto {
  email: string;
  password?: string;
  role?: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  password?: string;
  tenantCode?: string;
  role?: string;
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  tenantId: string;
  tenantCode: string;
  tenantName: string;
  roles: string[];
}

const SUPABASE_SERVICE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb2Nlc3NmbG93Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDE1MDAwMDAwfQ.kXKVA-qD6WSFUsP5-F0kTdEVTa6Ue1USh7Xq8Z6QStk';

const REGISTERED_USERS: Record<string, StoredUser> = {
  'criky95@live.com': {
    id: '9c1f70c2-ccf1-43d0-8a91-808bfb7b56d3',
    email: 'criky95@live.com',
    name: 'Cristhian Calderon',
    password: 'password123',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'GAD BABAHOYO',
    tenantName: 'GAD Municipal de Babahoyo',
    roles: ['administrator', 'architect'],
  },
  'carlos.mendoza@processflow.io': {
    id: 'caec2952-0092-49b9-9533-1e2e89030b46',
    email: 'carlos.mendoza@processflow.io',
    name: 'Carlos Mendoza',
    password: 'password123',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Enterprise Latam',
    roles: ['architect', 'administrator'],
  },

  'maria.lopez@processflow.io': {
    id: 'usr-maria-002',
    email: 'maria.lopez@processflow.io',
    name: 'María López',
    password: 'password123',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Enterprise Latam',
    roles: ['participant'],
  },
  'jorge.morales@processflow.io': {
    id: 'usr-jorge-003',
    email: 'jorge.morales@processflow.io',
    name: 'Jorge Morales',
    password: 'password123',
    tenantId: 'tenant-corp-enterprise',
    tenantCode: 'corp-enterprise',
    tenantName: 'Corp Enterprise Latam',
    roles: ['supervisor'],
  },
};

@Injectable()
export class AuthService {
  private supabaseAuthUrl = process.env.SUPABASE_AUTH_URL || 'http://supabase-auth:9999';

  constructor(private readonly jwtService: JwtService) {}

  private async syncUserToSupabase(user: { email: string; password?: string; name: string; tenantCode: string; role: string }) {
    try {
      await fetch(`${this.supabaseAuthUrl}/admin/users`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password || 'password123',
          email_confirm: true,
          user_metadata: {
            name: user.name,
            tenantCode: user.tenantCode,
            role: user.role,
          },
        }),
      });
    } catch (e) {
      // Non-blocking sync
      console.warn('Supabase sync warning:', e);
    }
  }

  async login(loginDto: LoginDto) {
    if (!loginDto.email || !loginDto.email.trim()) {
      throw new BadRequestException('El correo electrónico es obligatorio');
    }

    const emailKey = loginDto.email.toLowerCase().trim();
    const user = REGISTERED_USERS[emailKey];

    if (!user) {
      throw new UnauthorizedException('El usuario no existe. Por favor crea una cuenta en la pestaña "Crear Cuenta"');
    }

    if (user.password && loginDto.password && user.password !== loginDto.password) {
      throw new UnauthorizedException('Contraseña incorrecta. Por favor verifica tus credenciales');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      tenantId: user.tenantId,
      tenantCode: user.tenantCode,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId,
        tenantCode: user.tenantCode,
        tenantName: user.tenantName,
        roles: user.roles,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    if (!registerDto.email || !registerDto.email.trim()) {
      throw new BadRequestException('El correo electrónico es obligatorio');
    }

    const emailKey = registerDto.email.toLowerCase().trim();

    if (REGISTERED_USERS[emailKey]) {
      throw new BadRequestException('Este correo electrónico ya se encuentra registrado. Inicia sesión directamente.');
    }

    const tenantCode = registerDto.tenantCode || 'corp-enterprise';
    const role = registerDto.role || 'architect';
    const name = registerDto.name || emailKey.split('@')[0];
    const password = registerDto.password || 'password123';

    // Registrar en Supabase GoTrue Auth para persistencia y visualización en Supabase Studio
    await this.syncUserToSupabase({
      email: emailKey,
      name,
      password,
      tenantCode,
      role,
    });

    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      email: emailKey,
      name,
      password,
      tenantId: `tenant-${tenantCode}`,
      tenantCode: tenantCode,
      tenantName: `${tenantCode.toUpperCase()} Latam`,
      roles: [role],
    };

    REGISTERED_USERS[emailKey] = newUser;

    return this.login({
      email: emailKey,
      password,
      role,
    });
  }

  async getProfile(userId: string, email: string) {
    const user = REGISTERED_USERS[email.toLowerCase()];
    if (!user) {
      throw new UnauthorizedException('Perfil de usuario no encontrado');
    }
    return user;
  }
}
