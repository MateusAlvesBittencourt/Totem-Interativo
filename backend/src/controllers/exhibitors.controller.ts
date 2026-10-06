import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Exhibitor } from '../entities/exhibitor.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Exhibitors')
@Controller('/exhibitors')
export class ExhibitorsController {
  constructor(
    @InjectRepository(Exhibitor)
    private readonly exhibitorsRepository: Repository<Exhibitor>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all exhibitors' })
  @ApiResponse({ status: 200, description: 'Exhibitors successfully listed' })
  async findAll(): Promise<Exhibitor[]> {
    return this.exhibitorsRepository.find({
        order: { exhibitorName: 'ASC' },
    });
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Search exhibitors by name' })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'Exhibitor name (or part of it)',
  })
  @ApiResponse({ status: 200, description: 'List of matching exhibitors' })
  async findByName(@Param('name') name: string): Promise<Exhibitor[]> {
    return this.exhibitorsRepository.find({
      where: { exhibitorName: name },
    });
  }

  @Get('building/:name')
  @ApiOperation({ summary: 'Search exhibitors by building name' })
  @ApiParam({ name: 'name', type: String, description: 'Building name' })
  @ApiResponse({ status: 200, description: 'List of matching exhibitors' })
  async findByBuilding(@Param('name') name: string): Promise<Exhibitor[]> {
    return this.exhibitorsRepository.find({
      where: { buildingName: Like(`%${name}%`) },
      order: { exhibitorName: 'ASC' },
    });
  }


  @Get('category/:id')
  async byCategory(@Param('id', ParseIntPipe) id: number) {
    return this.exhibitorsRepository
      .createQueryBuilder('e')
      .leftJoin('e.categories', 'c')
      .where('c.categoryId = :id', { id })
      .getMany();
  }

  @Get('subcategory/:id')
  @ApiOperation({ summary: 'List exhibitors by subcategory id' })
  async bySubcategory(@Param('id', ParseIntPipe) id: number) {
    return this.exhibitorsRepository
      .createQueryBuilder('e')
      .leftJoin('e.subcategories', 's')
      .where('s.id = :id', { id })
      .getMany();
  }

}
