import { TaskEntity } from '@domain/entities/task.entity';

export interface TaskRepository {
  create(entity: TaskEntity): Promise<TaskEntity>;
  findAll(page: number, limit: number, id?: string): Promise<TaskEntity[]>;
  findAnUpdate(id: string, data: any): Promise<TaskEntity>;
}
