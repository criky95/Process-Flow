import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  tenantId: string;
  tenantCode: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'processflow_super_secret_jwt_key_2026_processflow_auth',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.tenantId) {
      throw new UnauthorizedException('Token JWT con estructura de claims no válida');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      tenantId: payload.tenantId,
      tenantCode: payload.tenantCode,
      roles: payload.roles || ['participant'],
    };
  }
}
