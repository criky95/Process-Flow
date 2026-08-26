import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const headerTenantId = request.headers['x-tenant-id'];

    if (!user || !user.tenantId) {
      throw new ForbiddenException('Aislamiento Multi-Tenant: Usuario sin tenant asignado');
    }

    if (headerTenantId && headerTenantId !== user.tenantId && headerTenantId !== user.tenantCode) {
      throw new ForbiddenException(
        'Aislamiento Multi-Tenant: El tenant especificado en header no corresponde al usuario autenticado',
      );
    }

    return true;
  }
}
