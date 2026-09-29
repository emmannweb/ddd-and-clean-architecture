import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TaskUpdateData } from '@domain/repositories/task.repository';
import { Task, TaskDocument } from '../schemas/task.schema';
import { UUID } from 'crypto';

export class TaskPersistenceMapper {
  static toPersistence(entity: TaskEntity) {
    return {
      _id: entity.getId(),
      name: entity.getName(),
      description: entity.getDescription(),
      list: entity.getList().map(TaskPersistenceMapper.toPersistenceList),
    };
  }

  static toPersistenceUpdate(data: TaskUpdateData): Partial<Task> {
    const update: Partial<Task> = {};
    if (data.name !== undefined) update.name = data.name;
    if (data.description !== undefined) update.description = data.description;
    if (data.list !== undefined) {
      update.list = data.list.map(TaskPersistenceMapper.toPersistenceList);
    }
    return update;
  }

  static toDomain(raw: TaskDocument): TaskEntity {
    const record = raw as TaskDocument & { created_at?: Date; updated_at?: Date; id?: UUID };
    return new TaskEntity({
      _id: record.id,
      name: record.name,
      description: record.description,
      list: (record.list ?? []).map(
        item =>
          new TaskListEntity({
            assignName: item.assignName,
            function: item.function,
          }),
      ),
      created_at: record.created_at,
      updated_at: record.updated_at,
    });
  }

  private static toPersistenceList(entity: TaskListEntity) {
    return {
      assignName: entity.getTaskAssignName(),
      function: entity.getFunction(),
    };
  }
}
