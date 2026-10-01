import { CreateTaskCommand, UpdateTaskCommand } from '@application/commands/export-all.commands';
import { TaskEntity } from '@domain/entities/task.entity';
import { ApplicationListMapper } from './complements/list.mapper';
import { TaskDto, UpdateTaskDto } from '@shared/dtos/taskDto/task.dto';
import { CreateTaskDto } from '@shared/dtos/taskDto/create.task.dto';

/*
Task Application Mapper
*/
export class ApplicationTaskMapper {
  static toTaskCommand(data: CreateTaskDto): CreateTaskCommand {
    return new CreateTaskCommand(data.name, data.description, data.list.map(ApplicationListMapper.toEntity));
  }
  static toUpdateCommand(data: UpdateTaskDto): UpdateTaskCommand {
    return new UpdateTaskCommand(data.name, data.description, data.list?.map(ApplicationListMapper.toEntity));
  }
  static toEntity(command: CreateTaskCommand): TaskEntity {
    return new TaskEntity({
      name: command.name,
      description: command.description,
      list: command.list,
    });
  }

  static toDto(entity: TaskEntity): TaskDto {
    return {
      _id: entity.getId(),
      name: entity.getName(),
      description: entity.getDescription(),
      list: entity.getList().map(ApplicationListMapper.toDto),
    };
  }
}
