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
import { Product } from '../entities/product.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'Products successfully listed' })
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product | null> {
    return this.productsRepository.findOneBy({ productId: id });
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Search products by name' })
  @ApiParam({ name: 'name', type: String, description: 'Product name (or part of it)' })
  @ApiResponse({ status: 200, description: 'List of matching products' })
  async findByName(@Param('name') name: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { productName: Like(`%${name}%`) },
    });
  }
}
