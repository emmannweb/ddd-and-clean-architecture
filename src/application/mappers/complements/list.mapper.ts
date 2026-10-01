import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TaskListDto } from '@shared/dtos/taskDto/task.list.dto';

/*
Task Application Mapper
*/
export class ApplicationListMapper {
  static toEntity(command: TaskListDto): TaskListEntity {
    return new TaskListEntity({
      assignName: command.assignName,
      function: command.function,
    });
  }

  static toDto(entity: TaskListEntity): TaskListDto {
    return {
      assignName: entity.getTaskAssignName(),
      function: entity.getFunction(),
    };
  }
}
