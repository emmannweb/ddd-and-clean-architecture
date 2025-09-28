import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { TaskController } from './controllers/task.controllers';

const controllers: any = [TaskController];

@Module({
  imports: [ApplicationModule],
  controllers: [...controllers],
})
export class PresentationModule {}
