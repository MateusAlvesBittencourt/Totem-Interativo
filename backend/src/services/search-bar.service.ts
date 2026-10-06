import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Exhibitor } from '../entities/exhibitor.entity';
import { SearchBarDto } from '../dtos/searchBar.dto';

@Injectable()
export class SearchBarService {
  constructor(
    @InjectRepository(Exhibitor)
    private readonly exhibitorRepository: Repository<Exhibitor>,
  ) {}

  async searchExhibitors({ query }: SearchBarDto): Promise<Exhibitor[]> {
    const term = `%${query.toLowerCase()}%`;
    if (!query) {
      return this.exhibitorRepository.find({
        relations: {
          categories: { subcategories: true },
          subcategories: true,
          products: true,
        },
      });
    }
    return this.exhibitorRepository
      .createQueryBuilder('exhibitor')
      .leftJoin('exhibitor.categories', 'category')
      .leftJoin('category.subcategories', 'subcategory')
      .leftJoin('exhibitor.products', 'product')
      .where(
        new Brackets((qb) => {
          qb.where('LOWER(exhibitor.exhibitorName)   LIKE :term', { term })
            .orWhere('LOWER(category.categoryName)   LIKE :term', { term })
            .orWhere('LOWER(subcategory.subcategory_name) LIKE :term', { term })
            .orWhere('LOWER(product.product_name)     LIKE :term', { term })
        }),
      )
      .distinct(true)
      .getMany();
  }
}
