/*
UPDATE TASK USE CASE
*/
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';
import { UpdateTaskCommand } from '@application/commands/export-all.commands';
import { TaskNotFoundError } from '@application/errors/task-not-found.error';
import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { TaskDto } from '@shared/dtos/taskDto/task.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_INJECT_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, command: UpdateTaskCommand): Promise<TaskDto> {
    const task = await this.taskRepository.update(id, command);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return ApplicationTaskMapper.toDto(task);
  }
}
