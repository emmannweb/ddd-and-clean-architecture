/*
FIND ALL TASKS USE CASE
*/

import { TaskEntity } from '@domain/entities/task.entity';
import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FindTasksUseCase {
  constructor(
    @Inject(TASK_INJECT_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(page: number, limit: number, id?: string): Promise<TaskEntity[]> {
    return await this.taskRepository.findAll(page, limit, id);
  }
}
