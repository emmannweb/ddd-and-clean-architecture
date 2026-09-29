/*
CREATE TASK USE CASE
*/
import { CreateTaskCommand } from '@application/commands/export-all.commands';
import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';
import { TaskDto } from '@shared/dtos/taskDto/task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(@Inject(TASK_INJECT_TOKEN) private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<TaskDto> {
    const task = ApplicationTaskMapper.toEntity(command);
    const createdTask = await this.taskRepository.create(task);
    return ApplicationTaskMapper.toDto(createdTask);
  }
}
