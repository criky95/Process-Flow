import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TenantAuthGuard, AuthenticatedRequest } from '../../common/guards/tenant-auth.guard';
import { prisma } from '@processflow/db';

@Controller('api/v1/audit')
@UseGuards(TenantAuthGuard)
export class AuditController {
  @Get()
  async getAuditLogs(@Req() req: AuthenticatedRequest): Promise<any> {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return logs;
  }
}
