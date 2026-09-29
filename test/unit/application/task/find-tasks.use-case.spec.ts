import { FindTasksUseCase } from '@application/use-cases/task/find-tasks.use-case';
import { TaskEntity } from '@domain/entities/task.entity';
import { TaskListEntity } from '@domain/entities/value-objects/task-list.entity';
import { TASK_INJECT_TOKEN } from '@domain/tokens/inject.token';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

describe('FindTasksUseCase', () => {
  let service: FindTasksUseCase;

  const mockTaskRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTasksUseCase,
        {
          provide: TASK_INJECT_TOKEN,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<FindTasksUseCase>(FindTasksUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findTasks', () => {
    it('should return mapped tasks and pagination metadata using default pagination', async () => {
      const id = randomUUID();
      const list = [new TaskListEntity({ assignName: 'Alex', function: 'Review' })];
      const task = new TaskEntity({
        _id: id,
        name: 'Test Task',
        description: 'Test Description',
        list,
      });
      const pagination = {
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 1,
      };

      mockTaskRepository.findAll.mockResolvedValue({ items: [task], ...pagination });

      const result = await service.execute({});

      expect(result).toEqual({
        items: [
          {
            _id: id,
            name: 'Test Task',
            description: 'Test Description',
            list: [{ assignName: 'Alex', function: 'Review' }],
          },
        ],
        ...pagination,
      });
      expect(mockTaskRepository.findAll).toHaveBeenCalledWith({ pageNumber: 1, pageSize: 10 });
    });

    it('should pass the requested pagination to the repository', async () => {
      const request = { pageNumber: 2, pageSize: 5 };
      mockTaskRepository.findAll.mockResolvedValue({
        items: [],
        pageNumber: 2,
        pageSize: 5,
        totalPages: 0,
        totalRecords: 0,
      });

      await service.execute(request);

      expect(mockTaskRepository.findAll).toHaveBeenCalledWith(request);
    });
  });
});
