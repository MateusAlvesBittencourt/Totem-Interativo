import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { Lead } from './lead.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity('Exhibitor')
export class Exhibitor {
  @PrimaryGeneratedColumn({ name: 'exhibitor_id' })
  exhibitorId!: number;

  @Column({ name: 'exhibitor_name', type: 'text', nullable: true })
  exhibitorName!: string | null;

  @Column('text', { name: 'building_name', nullable: true })
  buildingName!: string | null;

  @ManyToMany(() => Subcategory, (sub) => sub.exhibitors)
  @JoinTable({
    name: 'Exhibitor_Subcategory',
    joinColumn: { name: 'exhibitor_id' },
    inverseJoinColumn: { name: 'subcategory_id' },
  })
  subcategories!: Subcategory[];

  @ManyToMany(() => Category, (cat) => cat.exhibitors)
  categories!: Category[];

  @OneToMany(() => Lead, (lead) => lead.exhibitor) leads!: Lead[];
  @OneToMany(() => Product, (p) => p.exhibitor) products!: Product[];
}
