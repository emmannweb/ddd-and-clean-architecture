import { TaskNotFoundError } from '@application/errors/task-not-found.error';
import { UpdateTaskUseCase } from '@application/use-cases/task/update-task.use-case';
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskCommand } from '@application/commands/export-all.commands';
import { randomUUID } from 'crypto';

describe('UpdateTaskUseCase', () => {
  let service: UpdateTaskUseCase;

  const mockTaskRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        {
          provide: TASK_INJECT_TOKEN,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const id = randomUUID();
      const list = [new TaskListEntity({ assignName: 'Alex', function: 'Review' })];
      const command = new UpdateTaskCommand('Updated Task', 'Updated Description', list);
      const updatedTask = new TaskEntity({
        _id: id,
        name: 'Updated Task',
        description: 'Updated Description',
        list,
      });

      mockTaskRepository.update.mockResolvedValue(updatedTask);

      const result = await service.execute(id, command);

      expect(result).toEqual({
        _id: id,
        name: 'Updated Task',
        description: 'Updated Description',
        list: [{ assignName: 'Alex', function: 'Review' }],
      });
      expect(mockTaskRepository.update).toHaveBeenCalledWith(id, command);
    });

    it('should throw a TaskNotFoundError if the task does not exist', async () => {
      const id = randomUUID();
      const command = new UpdateTaskCommand('Updated Task');

      mockTaskRepository.update.mockResolvedValue(null);

      await expect(service.execute(id, command)).rejects.toThrow(new TaskNotFoundError(id));
      expect(mockTaskRepository.update).toHaveBeenCalledWith(id, command);
    });
  });
});
