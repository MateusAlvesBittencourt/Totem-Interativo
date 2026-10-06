import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exhibitor } from './exhibitor.entity';
import { Subcategory } from './subcategory.entity';
import { Lead } from './lead.entity';
import { Product } from './product.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number | null;

  @Column('text', { name: 'category_name', nullable: true })
  categoryName: string | null;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @ManyToMany(() => Subcategory, (subcategory) => subcategory.categories)
  subcategories2: Subcategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => Exhibitor, (ex) => ex.categories)
  @JoinTable({
    name: 'Exhibitor_Category',
    joinColumn: { name: 'category_id', referencedColumnName: 'categoryId' },
    inverseJoinColumn: {
      name: 'exhibitor_id',
      referencedColumnName: 'exhibitorId',
    },
  })
  exhibitors!: Exhibitor[];

  @OneToMany(() => Lead, (lead) => lead.category)
  leads: Lead[];
}
