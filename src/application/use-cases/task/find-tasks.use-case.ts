/*
FIND ALL TASKS USE CASE
*/

import { TaskRepository } from '@domain/repositories/task.repository';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Injectable, Inject } from '@nestjs/common';
import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { TaskDto } from '@shared/dtos/taskDto/task.dto';
import { TaskQueryDto } from '@shared/dtos/taskDto/task.query.dto';
import { PaginatedResponseDto } from '@shared/pagination/paginated-response.dto';

@Injectable()
export class FindTasksUseCase {
  constructor(
    @Inject(TASK_INJECT_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(request: TaskQueryDto): Promise<PaginatedResponseDto<TaskDto>> {
    const { pageNumber = 1, pageSize = 10 } = request;
    const { items, ...rest } = await this.taskRepository.findAll({ pageNumber, pageSize });

    return {
      items: items.map(ApplicationTaskMapper.toDto),
      ...rest,
    };
  }
}
