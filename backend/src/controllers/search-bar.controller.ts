import { Controller, Get, Query } from '@nestjs/common';
import { SearchBarService } from '../services/search-bar.service';
import { SearchBarDto } from '../dtos/searchBar.dto';
import { Exhibitor } from '../entities/exhibitor.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchBarController {
  constructor(private readonly searchService: SearchBarService) {}

  @Get()
  @ApiOperation({ summary: 'Search exhibitors using filters' })
  @ApiResponse({
    status: 200,
    description: 'List of matching exhibitors',
    type: [Exhibitor],
  })
  @ApiQuery({ name: 'name', required: false, description: 'Exhibitor name' })
  search(@Query() searchDto: SearchBarDto): Promise<Exhibitor[]> {
    return this.searchService.searchExhibitors(searchDto);
  }
}
