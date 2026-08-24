import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedRequest extends Request {
  tenantId: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

@Injectable()
export class TenantAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const tenantId = (request.headers['x-tenant-id'] as string) || 'corp-enterprise';
    
    request.tenantId = tenantId;
    request.user = {
      id: (request.headers['x-user-id'] as string) || 'usr-demo-carlos',
      email: 'carlos.mendoza@processflow.io',
      name: 'Carlos Mendoza',
      role: (request.headers['x-user-role'] as string) || 'Analista Técnico',
    };

    return true;
  }
}
