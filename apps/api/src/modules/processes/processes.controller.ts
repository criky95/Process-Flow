import { Controller, Get, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TenantAuthGuard, AuthenticatedRequest } from '../../common/guards/tenant-auth.guard';
import { ProcessEngineService } from '../engine/process-engine.service';
import { prisma } from '@processflow/db';

@Controller('api/v1/processes')
@UseGuards(TenantAuthGuard)
export class ProcessesController {
  constructor(private readonly engineService: ProcessEngineService) {}

  @Get()
  async getCatalog(@Req() req: AuthenticatedRequest): Promise<any> {
    const definitions = await prisma.processDefinition.findMany({
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
        },
      },
    });
    return definitions;
  }

  @Post(':code/instantiate')
  async instantiate(
    @Param('code') code: string,
    @Body() body: Record<string, any>,
    @Req() req: AuthenticatedRequest
  ): Promise<any> {
    return this.engineService.instantiateProcess(code, req.user.id, req.tenantId, body);
  }
}
