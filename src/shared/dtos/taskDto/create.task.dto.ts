import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { TaskListDto } from './task.list.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
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
