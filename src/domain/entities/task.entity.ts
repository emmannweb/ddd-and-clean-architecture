/*
task Entity
*/

import { v4 as uuidv4 } from 'uuid';
import { TaskListEntity } from './value-objects/task-list.entity';

export class TaskEntity {
  private readonly _id: string;
  private name: string;
  private description?: string;
  private list: TaskListEntity[];
  private readonly created_at: Date;
  private readonly updated_at: Date;

  constructor(props: { _id: string; name: string; description: string; list: TaskListEntity[]; created_at?: Date; updated_at?: Date }) {
    this._id = props._id || uuidv4();
    this.name = props.name;
    this.description = props.description;
    this.list = props.list;
    this.created_at = props.created_at || new Date();
    this.updated_at = props.updated_at || new Date();
  }

  // Getters
  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getList(): TaskListEntity[] {
    return this.list;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getUpdatedAt(): Date {
    return this.updated_at;
  }
}
