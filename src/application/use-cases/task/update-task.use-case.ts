/*
UPDATE TASK USE CASE
*/
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_INJECT_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, data: any): Promise<TaskEntity> {
    return await this.taskRepository.findAnUpdate(id, data);
  }
}
