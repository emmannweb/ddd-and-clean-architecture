/*
Task Dto
*/

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';

//task list
export class TaskListDto {
  @ApiProperty({ description: 'assignName' })
  @IsString()
  readonly assignName!: string;

  @ApiProperty({ description: 'function' })
  @IsString()
  readonly function!: string;
}

//main task
export class TaskDto {
  @ApiProperty({ description: '_id' })
  readonly _id!: UUID;

  @ApiProperty({ description: 'name' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ description: 'description' })
  @IsString()
  readonly description!: string;

  @ValidateNested({ each: true })
  @Type(() => TaskListDto)
  @ApiProperty({ type: [TaskListDto] })
  list!: TaskListDto[];
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
