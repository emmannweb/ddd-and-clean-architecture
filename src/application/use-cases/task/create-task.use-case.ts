/*
CREATE TASK USE CASE
*/
import { CreateTaskCommand } from '@application/commands/export-all.commands';
import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase {
  constructor(@Inject(TASK_INJECT_TOKEN) private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<TaskEntity> {
    const task = ApplicationTaskMapper.toEntity(command);
    return this.taskRepository.create(task);
  }
}
