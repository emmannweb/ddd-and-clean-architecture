import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';

export interface TaskUpdateData {
  name?: string;
  description?: string;
  list?: TaskListEntity[];
}

export interface TaskRepository {
  create(entity: TaskEntity): Promise<TaskEntity>;
  findAll(page: number, limit: number, id?: string): Promise<TaskEntity[]>;
  update(id: string, data: TaskUpdateData): Promise<TaskEntity | null>;
}
