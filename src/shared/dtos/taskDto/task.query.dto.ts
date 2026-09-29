import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class TaskQueryDto {
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  @IsPositive()
  @IsOptional()
  pageNumber?: number = 1;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page size',
    default: 10,
  })
  @IsPositive()
  @IsOptional()
  pageSize?: number = 10;
}
