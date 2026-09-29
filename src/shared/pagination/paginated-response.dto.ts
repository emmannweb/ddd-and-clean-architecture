import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  // This property will be dynamically typed for the array of objects
  @ApiProperty({ type: [Object], description: 'Array of items' })
  items!: T[];

  @ApiProperty({ description: 'Current page number' })
  pageNumber!: number;

  @ApiProperty({ description: 'Number of items per page' })
  pageSize!: number;

  @ApiProperty({ description: 'Total number of items' })
  totalPages!: number;

  @ApiProperty({ description: 'Number of records' })
  totalRecords!: number;
}
