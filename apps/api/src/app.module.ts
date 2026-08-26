import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProcessEngineService } from './modules/engine/process-engine.service';
import { TasksController } from './modules/tasks/tasks.controller';
import { ProcessesController } from './modules/processes/processes.controller';
import { AuditController } from './modules/audit/audit.controller';

@Module({
  imports: [AuthModule],
  controllers: [TasksController, ProcessesController, AuditController],
  providers: [ProcessEngineService],
})
export class AppModule {}

