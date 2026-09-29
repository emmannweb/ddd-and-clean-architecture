import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from '@infrastructure/health/health.module';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { TaskPersistence } from '@infrastructure/database/persistence/task.persistence';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';

@Module({
  imports: [HttpModule, HealthModule, EnvConfigModule, DatabaseModule],
  providers: [
    {
      provide: TASK_INJECT_TOKEN,
      useExisting: TaskPersistence,
    },
  ],
  exports: [HealthModule, DatabaseModule, TASK_INJECT_TOKEN],
})
export class InfrastructureModule {}
