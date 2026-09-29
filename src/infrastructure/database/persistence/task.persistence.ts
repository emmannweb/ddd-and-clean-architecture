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
import { TaskQueryDto } from '@shared/dtos/taskDto/task.query.dto';
import { PaginatedResponseDto } from '@shared/pagination/paginated-response.dto';

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

  async findAll(request: TaskQueryDto): Promise<PaginatedResponseDto<TaskEntity>> {
    const { pageNumber = 1, pageSize = 10 } = request;

    const [tasks, totalRecords] = await Promise.all([
      this.taskModel
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.taskModel.countDocuments().exec(),
    ]);

    return {
      items: tasks.map(TaskPersistenceMapper.toDomain),
      totalRecords,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(totalRecords / pageSize),
    };
  }

  async update(id: string, data: TaskUpdateData): Promise<TaskEntity | null> {
    const task = await this.taskModel.findByIdAndUpdate(id, TaskPersistenceMapper.toPersistenceUpdate(data), { new: true, runValidators: true });
    return task ? TaskPersistenceMapper.toDomain(task) : null;
  }
}
