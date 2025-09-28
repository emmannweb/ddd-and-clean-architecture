import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionModule } from '@infrastructure/database/connection/mongo-connect.module';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskPersistence } from './persistence/task.persistence';

const persistences: any = [TaskPersistence];

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), ConnectionModule, EnvConfigModule],
  providers: [...persistences],
  exports: [ConnectionModule, ...persistences],
})
export class DatabaseModule {}
