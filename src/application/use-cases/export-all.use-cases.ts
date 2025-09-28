import { FindTasksUseCase } from './task/find-all-task.use-case';
import { CreateTaskUseCase } from './task/create-task.use-case';
import { UpdateTaskUseCase } from './task/update-task.use-case';

// Adding export in this array
export default [CreateTaskUseCase, FindTasksUseCase, UpdateTaskUseCase];
