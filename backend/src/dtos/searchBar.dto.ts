import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchBarDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Name to search', example: 'ExpoTech' })
  query?: string;
}
