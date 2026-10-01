import { ApplicationTaskMapper } from '@application/mappers/task.mapper';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@infrastructure/decorators/paginated-response.decorator';
import { TaskDto, UpdateTaskDto } from '@shared/dtos/taskDto/task.dto';
import { CreateTaskUseCase } from '@application/use-cases/task/create-task.use-case';
import { FindTasksUseCase } from '@application/use-cases/task/find-tasks.use-case';
import { UpdateTaskUseCase } from '@application/use-cases/task/update-task.use-case';
import { TaskQueryDto } from '@shared/dtos/taskDto/task.query.dto';
import { PaginatedResponseDto } from '@shared/pagination/paginated-response.dto';
import { CreateTaskDto } from '@shared/dtos/taskDto/create.task.dto';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateTaskDto): Promise<TaskDto> {
    const command = ApplicationTaskMapper.toTaskCommand(request);
    return await this.createTaskUseCase.execute(command);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(TaskDto)
  async findAll(@Query() request: TaskQueryDto): Promise<PaginatedResponseDto<TaskDto>> {
    return await this.findTasksUseCase.execute(request);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async findAndUpdate(@Param('id') id: string, @Body() request: UpdateTaskDto): Promise<TaskDto> {
    const command = ApplicationTaskMapper.toUpdateCommand(request);
    return await this.updateTaskUseCase.execute(id, command);
  }
}
