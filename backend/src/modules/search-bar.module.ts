import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchBarService } from '../services/search-bar.service';
import { SearchBarController } from '../controllers/search-bar.controller';
import { Category } from '../entities/category.entity';
import { Exhibitor } from '../entities/exhibitor.entity';
import { Subcategory } from '../entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Exhibitor, Subcategory])],
  controllers: [SearchBarController],
  providers: [SearchBarService],
})
export class SearchBarModule {}
