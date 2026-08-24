import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma, ProcessStatus, InstanceStatus, TaskStatus, SlaStatus, TaskPriority } from '@processflow/db';

@Injectable()
export class ProcessEngineService {
  async instantiateProcess(processCode: string, initiatorId: string, tenantId: string, variables: Record<string, any> = {}): Promise<any> {
    // 1. Fetch tenant
    const tenant = await prisma.tenant.findFirst({
      where: { OR: [{ id: tenantId }, { code: tenantId }] },
    });
    if (!tenant) throw new NotFoundException(`Tenant '${tenantId}' no encontrado`);

    // 2. Fetch published process definition and latest version
    const def = await prisma.processDefinition.findFirst({
      where: { tenantId: tenant.id, code: processCode, status: ProcessStatus.PUBLISHED },
      include: {
        versions: {
          where: { status: ProcessStatus.PUBLISHED },
          orderBy: { versionNumber: 'desc' },
          take: 1,
        },
      },
    });

    if (!def || !def.versions[0]) {
      throw new NotFoundException(`Proceso publicado '${processCode}' no encontrado para el tenant`);
    }

    const version = def.versions[0];
    const graphSchema = version.graphSchema as any;

    // 3. Create Process Instance
    const instanceCode = `PROC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const instance = await prisma.processInstance.create({
      data: {
        tenantId: tenant.id,
        processVersionId: version.id,
        code: instanceCode,
        initiatorId,
        status: InstanceStatus.RUNNING,
        variables,
      },
    });

    // 4. Find Start Node and First Task in graphSchema
    const startNode = graphSchema?.nodes?.find((n: any) => n.nodeType === 'start');
    const firstEdge = graphSchema?.edges?.find((e: any) => e.source === startNode?.id);
    const firstTaskNode = graphSchema?.nodes?.find((n: any) => n.id === firstEdge?.target);

    if (firstTaskNode) {
      await prisma.taskInstance.create({
        data: {
          processInstanceId: instance.id,
          activityNodeId: firstTaskNode.id,
          activityName: firstTaskNode.label || 'Primera Actividad',
          assignedRole: firstTaskNode.assignedRole || 'Analista Técnico',
          assignedToId: initiatorId,
          priority: TaskPriority.HIGH,
          status: TaskStatus.PENDING,
          slaStatus: SlaStatus.NORMAL,
          slaHours: firstTaskNode.slaHours || 24,
          dueDate: new Date(Date.now() + (firstTaskNode.slaHours || 24) * 3600 * 1000),
        },
      });
    }

    // 5. Append-only Audit Log
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        eventType: 'PROCESS_INSTANCE_CREATED',
        actorId: initiatorId,
        actorRole: 'Initiator',
        payload: {
          instanceId: instance.id,
          instanceCode: instance.code,
          processCode,
          versionNumber: version.versionNumber,
        },
      },
    });

    return instance;
  }

  async transitionTask(taskId: string, action: 'complete' | 'approve' | 'reject' | 'return', payload: Record<string, any>, actorId: string): Promise<any> {
    const task = await prisma.taskInstance.findUnique({
      where: { id: taskId },
      include: {
        processInstance: {
          include: { processVersion: true, tenant: true },
        },
      },
    });

    if (!task) throw new NotFoundException(`Tarea '${taskId}' no encontrada`);
    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException(`La tarea ya fue completada previamente`);
    }

    // 1. Mark task as completed
    const updatedTask = await prisma.taskInstance.update({
      where: { id: taskId },
      data: {
        status: action === 'reject' ? TaskStatus.RETURNED : TaskStatus.COMPLETED,
        completedAt: new Date(),
      },
    });

    // 2. Evaluate graph transition
    const graphSchema = task.processInstance.processVersion.graphSchema as any;
    const currentEdge = graphSchema?.edges?.find((e: any) => e.source === task.activityNodeId);
    const nextNode = graphSchema?.nodes?.find((n: any) => n.id === currentEdge?.target);

    if (nextNode && nextNode.nodeType !== 'end') {
      await prisma.taskInstance.create({
        data: {
          processInstanceId: task.processInstanceId,
          activityNodeId: nextNode.id,
          activityName: nextNode.label || 'Siguiente Actividad',
          assignedRole: nextNode.assignedRole || 'Aprobador',
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          slaStatus: SlaStatus.NORMAL,
          slaHours: nextNode.slaHours || 24,
          dueDate: new Date(Date.now() + (nextNode.slaHours || 24) * 3600 * 1000),
        },
      });
    } else {
      // Complete instance if end node reached
      await prisma.processInstance.update({
        where: { id: task.processInstanceId },
        data: {
          status: InstanceStatus.COMPLETED,
          completedAt: new Date(),
        },
      });
    }

    // 3. Append-only Audit Log
    await prisma.auditLog.create({
      data: {
        tenantId: task.processInstance.tenantId,
        eventType: `TASK_${action.toUpperCase()}`,
        actorId,
        actorRole: task.assignedRole,
        payload: {
          taskId,
          taskName: task.activityName,
          instanceCode: task.processInstance.code,
          action,
          payload,
        },
      },
    });

    return updatedTask;
  }
}
