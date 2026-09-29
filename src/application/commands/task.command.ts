/*
Task Command
*/

import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';

export class CreateTaskCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly list: TaskListEntity[],
  ) {}
}

export class UpdateTaskCommand {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly list?: TaskListEntity[],
  ) {}
}
