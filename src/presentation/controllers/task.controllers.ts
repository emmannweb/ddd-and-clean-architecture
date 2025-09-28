/*
Task Controller
*/
import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskDto } from '@shared/dtos/taskDto/task.dto';
import { CreateTaskUseCase } from '@application/use-cases/task/create-task.use-case';
import { FindTasksUseCase } from '@application/use-cases/task/find-all-task.use-case';
import { UpdateTaskUseCase } from '@application/use-cases/task/update-task.use-case';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() taskDto: TaskDto) {
    const command = ApplicationTaskMapper.toTaskCommand(taskDto);
    return await this.createTaskUseCase.execute(command);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('id') id = '') {
    return await this.findTasksUseCase.execute(page, limit, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async findAndUpdate(@Param('id') id: string, @Body() taskDto: TaskDto) {
    return await this.updateTaskUseCase.execute(id, taskDto);
  }
}
