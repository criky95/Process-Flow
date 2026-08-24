import { Controller, Get, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TenantAuthGuard, AuthenticatedRequest } from '../../common/guards/tenant-auth.guard';
import { ProcessEngineService } from '../engine/process-engine.service';
import { prisma } from '@processflow/db';

@Controller('api/v1/tasks')
@UseGuards(TenantAuthGuard)
export class TasksController {
  constructor(private readonly engineService: ProcessEngineService) {}

  @Get('inbox')
  async getInbox(@Req() req: AuthenticatedRequest): Promise<any> {
    const tasks = await prisma.taskInstance.findMany({
      include: {
        processInstance: {
          include: {
            processVersion: {
              include: { definition: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return tasks;
  }

  @Get(':id')
  async getTaskDetail(@Param('id') id: string): Promise<any> {
    const task = await prisma.taskInstance.findUnique({
      where: { id },
      include: {
        processInstance: {
          include: {
            processVersion: {
              include: { definition: true },
            },
            documents: true,
          },
        },
      },
    });
    return task;
  }

  @Post(':id/complete')
  async completeTask(
    @Param('id') id: string,
    @Body() body: Record<string, any>,
    @Req() req: AuthenticatedRequest
  ): Promise<any> {
    return this.engineService.transitionTask(id, 'complete', body, req.user.id);
  }

  @Post(':id/approve')
  async approveTask(
    @Param('id') id: string,
    @Body() body: Record<string, any>,
    @Req() req: AuthenticatedRequest
  ): Promise<any> {
    return this.engineService.transitionTask(id, 'approve', body, req.user.id);
  }

  @Post(':id/reject')
  async rejectTask(
    @Param('id') id: string,
    @Body() body: Record<string, any>,
    @Req() req: AuthenticatedRequest
  ): Promise<any> {
    return this.engineService.transitionTask(id, 'reject', body, req.user.id);
  }
}
