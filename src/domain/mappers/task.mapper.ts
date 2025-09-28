/*
task Domain Mapper
*/

import { TaskEntity } from '@domain/entities/task.entity';
import { DomainTaskListMapper } from './value-objects/task-mapper.vo';

export class DomainTaskMapper {
  static toPersistence(entity: TaskEntity): any {
    return {
      _id: entity.getId(),
      name: entity.getName(),
      description: entity.getDescription(),
      list: entity.getList().map(DomainTaskListMapper.toPersistence),
    };
  }

  static toDomain(raw: any): TaskEntity {
    return new TaskEntity({
      _id: raw.id,
      name: raw.name,
      description: raw.description,
      list: raw.list.map(DomainTaskListMapper.toDomain),
    });
  }
}
