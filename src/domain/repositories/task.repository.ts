import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TaskQueryDto } from '@shared/dtos/taskDto/task.query.dto';
import { PaginatedResponseDto } from '@shared/pagination/paginated-response.dto';

export interface TaskUpdateData {
  name?: string;
  description?: string;
  list?: TaskListEntity[];
}

export interface TaskRepository {
  create(entity: TaskEntity): Promise<TaskEntity>;
  findAll(request: TaskQueryDto): Promise<PaginatedResponseDto<TaskEntity>>;
  update(id: string, data: TaskUpdateData): Promise<TaskEntity | null>;
}
