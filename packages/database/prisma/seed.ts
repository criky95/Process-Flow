import { PrismaClient, ProcessStatus, InstanceStatus, TaskStatus, SlaStatus, TaskPriority } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ProcessFlow Database...');

  // 1. Tenant
  const tenant = await prisma.tenant.upsert({
    where: { code: 'corp-enterprise' },
    update: {},
    create: {
      code: 'corp-enterprise',
      name: 'Corp Enterprise Latam',
      description: 'Tenant Demo Principal de ProcessFlow',
    },
  });

  // 2. Roles
  const roles = [
    { code: 'architect', name: 'Process Architect' },
    { code: 'participant', name: 'Process Participant' },
    { code: 'supervisor', name: 'Supervisor' },
    { code: 'process_owner', name: 'Process Owner' },
    { code: 'administrator', name: 'Administrator' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { code: r.code },
      update: {},
      create: r,
    });
  }

  // 3. User
  const user = await prisma.user.upsert({
    where: { email: 'carlos.mendoza@processflow.io' },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'carlos.mendoza@processflow.io',
      name: 'Carlos Mendoza',
      password: 'hashed_password_demo',
    },
  });

  // 4. Process Definition
  const processDef = await prisma.processDefinition.upsert({
    where: {
      tenantId_code: { tenantId: tenant.id, code: 'PROC-COMPRAS' },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      code: 'PROC-COMPRAS',
      name: 'Compra de Bienes & Suministros',
      description: 'Proceso de aprobación de compras con cotizaciones y orden de compra.',
      category: 'Administrativo',
      ownerGroup: 'Dept. Finanzas & Compras',
      status: ProcessStatus.PUBLISHED,
    },
  });

  // 5. Process Version (v3 Published)
  const processVersion = await prisma.processVersion.upsert({
    where: {
      processDefinitionId_versionNumber: {
        processDefinitionId: processDef.id,
        versionNumber: 3,
      },
    },
    update: {},
    create: {
      processDefinitionId: processDef.id,
      versionNumber: 3,
      status: ProcessStatus.PUBLISHED,
      publishedAt: new Date(),
      graphSchema: {
        nodes: [
          { id: 'n1', label: 'Solicitud de Compra', nodeType: 'start' },
          { id: 'n2', label: 'Revisión Técnica', nodeType: 'human_task', assignedRole: 'Analista Técnico' },
          { id: 'n3', label: '¿Monto > $10,000?', nodeType: 'decision' },
          { id: 'n4', label: 'Aprobación Gerente Finanzas', nodeType: 'approval', assignedRole: 'Gerente Financiero' },
          { id: 'n5', label: 'Orden Generada & Cierre', nodeType: 'end' },
        ],
        edges: [
          { source: 'n1', target: 'n2' },
          { source: 'n2', target: 'n3' },
          { source: 'n3', target: 'n4', label: 'Sí' },
          { source: 'n3', target: 'n5', label: 'No' },
          { source: 'n4', target: 'n5' },
        ],
      },
    },
  });

  // 6. Process Instance
  const instance = await prisma.processInstance.upsert({
    where: { code: 'PROC-2026-00432' },
    update: {},
    create: {
      tenantId: tenant.id,
      processVersionId: processVersion.id,
      code: 'PROC-2026-00432',
      initiatorId: user.id,
      status: InstanceStatus.RUNNING,
      variables: { amount: 15000, item: 'Servidores de Computo' },
    },
  });

  // 7. Task Instance
  await prisma.taskInstance.create({
    data: {
      processInstanceId: instance.id,
      activityNodeId: 'n2',
      activityName: 'Revisión Técnica & Presupuesto',
      assignedToId: user.id,
      assignedRole: 'Analista Técnico',
      priority: TaskPriority.URGENT,
      status: TaskStatus.PENDING,
      slaStatus: SlaStatus.AT_RISK,
      slaHours: 48,
      dueDate: new Date(Date.now() + 3 * 3600 * 1000),
    },
  });

  // 8. Audit Log (Append-only)
  await prisma.auditLog.create({
    data: {
      tenantId: tenant.id,
      eventType: 'PROCESS_INSTANCE_CREATED',
      actorId: user.id,
      actorRole: 'Process Participant',
      payload: {
        instanceCode: 'PROC-2026-00432',
        processCode: 'PROC-COMPRAS',
        version: 3,
      },
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
