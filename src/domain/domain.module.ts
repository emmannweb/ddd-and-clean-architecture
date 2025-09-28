import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TASK_INJECT_TOKEN } from './tokens/inject.token';
import { TaskPersistence } from '@infrastructure/database/persistence/task.persistence';

const tokens: any = [TASK_INJECT_TOKEN];

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: TASK_INJECT_TOKEN,
      useExisting: TaskPersistence,
    },
  ],
  exports: [...tokens],
})
export class DomainModule {}
