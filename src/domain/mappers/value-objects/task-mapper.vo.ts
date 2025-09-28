import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';

export class DomainTaskListMapper {
  static toPersistence(entity: TaskListEntity): any {
    return {
      assignName: entity.getTaskAssignName(),
      function: entity.getFunction(),
    };
  }

  static toDomain(raw: any): TaskListEntity {
    return new TaskListEntity({
      assignName: raw.assignName,
      function: raw.function,
    });
  }
}
