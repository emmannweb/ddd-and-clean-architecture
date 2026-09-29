import { CreateTaskUseCase } from '@application/use-cases/task/create-task.use-case';
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

describe('CreateTaskUseCase', () => {
  let service: CreateTaskUseCase;

  const mockTaskRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TASK_INJECT_TOKEN,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const id = randomUUID();
      const list = [new TaskListEntity({ assignName: 'Alex', function: 'Review' })];
      const command = { name: 'Test Task', description: 'Test Description', list };
      const createdTask = new TaskEntity({ _id: id, ...command });

      mockTaskRepository.create.mockResolvedValue(createdTask);

      const result = await service.execute(command);

      expect(result).toEqual({
        _id: id,
        name: 'Test Task',
        description: 'Test Description',
        list: [{ assignName: 'Alex', function: 'Review' }],
      });
      expect(mockTaskRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: command.name,
          description: command.description,
          list: command.list,
        }),
      );
    });

    it('should throw an error if task creation fails', async () => {
      const command = { name: 'Test Task', description: 'Test Description', list: [] };
      const errorMessage = 'Failed to create task';

      mockTaskRepository.create.mockRejectedValue(new Error(errorMessage));

      await expect(service.execute(command)).rejects.toThrow(errorMessage);
    });
  });
});
