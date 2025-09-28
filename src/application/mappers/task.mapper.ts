import { CreateTaskCommand } from '@application/commands/export-all.commands';
import { TaskEntity } from '@domain/entities/task.entity';
import { ApplicationListMapper } from './complements/list.mapper';

/*
Task Application Mapper
*/
export class ApplicationTaskMapper {
  static toTaskCommand(data: any): CreateTaskCommand {
    return new CreateTaskCommand(data._id, data.name, data.description, data.list);
  }
  static toEntity(command: any): TaskEntity {
    return new TaskEntity({
      _id: command._id,
      name: command.name,
      description: command.description,
      list: command.list.map(ApplicationListMapper.toEntity),
    });
  }
}
