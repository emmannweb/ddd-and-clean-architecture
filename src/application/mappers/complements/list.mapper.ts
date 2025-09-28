import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';

/*
Task Application Mapper
*/
export class ApplicationListMapper {
  static toEntity(command: any): TaskListEntity {
    return new TaskListEntity({
      assignName: command.assignName,
      function: command.function,
    });
  }
}
