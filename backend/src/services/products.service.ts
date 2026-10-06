import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
  }

  create(data: Partial<Product>): Promise<Product> {
    const category = this.productRepository.create(data);
    return this.productRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
