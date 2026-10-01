import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//task list
export class TaskListDto {
  @ApiProperty({ description: 'assignName' })
  @IsString()
  readonly assignName!: string;

  @ApiProperty({ description: 'function' })
  @IsString()
  readonly function!: string;
}
