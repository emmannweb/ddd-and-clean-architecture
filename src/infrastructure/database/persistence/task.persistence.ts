/*
Task Persistence
*/
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskRepository } from '@domain/repositories/task.repository';
import { Task, TaskDocument } from '../schemas/task.schema';
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskUpdateData } from '@domain/repositories/task.repository';
import { TaskPersistenceMapper } from '../mappers/task-persistence.mapper';

@Injectable()
export class TaskPersistence implements TaskRepository {
  private readonly logger = new Logger(TaskPersistence.name);

  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  // Main methods

  async create(task: TaskEntity): Promise<TaskEntity> {
    const createdTask = await this.taskModel.create(TaskPersistenceMapper.toPersistence(task));
    this.logger.log('task created...');
    return TaskPersistenceMapper.toDomain(createdTask);
  }

  async findAll(page: number, limit: number, id?: string): Promise<TaskEntity[]> {
    const query: any = {};
    if (id) {
      query._id = id;
    }
    const tasks = await this.taskModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return tasks.map(TaskPersistenceMapper.toDomain);
  }

  async update(id: string, data: TaskUpdateData): Promise<TaskEntity | null> {
    const task = await this.taskModel.findByIdAndUpdate(id, TaskPersistenceMapper.toPersistenceUpdate(data), { new: true, runValidators: true });
    return task ? TaskPersistenceMapper.toDomain(task) : null;
  }
}
