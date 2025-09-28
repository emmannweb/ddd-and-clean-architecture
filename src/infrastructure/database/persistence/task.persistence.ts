/*
Task Persistence
*/
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskRepository } from '@domain/repositories/task.repository';
import { Task, TaskDocument } from '../schemas/task.schema';
import { TaskEntity } from '@domain/entities/task.entity';
import { DomainTaskMapper } from '@domain/mappers/task.mapper';

@Injectable()
export class TaskPersistence implements TaskRepository {
  private readonly logger = new Logger(TaskPersistence.name);

  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  // Main methods

  async create(task: TaskEntity): Promise<TaskEntity> {
    const createTask = DomainTaskMapper.toPersistence(task);
    await this.taskModel.create(createTask);
    this.logger.log('task created...');
    return DomainTaskMapper.toDomain(createTask);
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
    return tasks.map(DomainTaskMapper.toDomain);
  }

  async findAnUpdate(id: string, data: any): Promise<TaskEntity> {
    const task = await this.taskModel.findByIdAndUpdate(id, data, { new: true });
    return DomainTaskMapper.toDomain(task);
  }
}
