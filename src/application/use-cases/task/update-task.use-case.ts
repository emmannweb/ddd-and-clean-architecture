/*
UPDATE TASK USE CASE
*/
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';
import { UpdateTaskCommand } from '@application/commands/export-all.commands';
import { TaskNotFoundError } from '@application/errors/task-not-found.error';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_INJECT_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, command: UpdateTaskCommand): Promise<TaskEntity> {
    const task = await this.taskRepository.update(id, command);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }
}
