import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Category } from './category.entity';
  import { Subcategory } from './subcategory.entity';
  import { Exhibitor } from './exhibitor.entity';
  
  @Entity('Product')
  export class Product {
    @PrimaryGeneratedColumn({ name: 'product_id', type: 'integer' })
    productId: number;
  
    @Column('varchar', { name: 'product_name', length: 100 })
    productName: string;
  
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;
  
    @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
    @JoinColumn({ name: 'subcategory_id' })
    subcategory: Subcategory;

    @ManyToOne(() => Exhibitor, (exhibitor) => exhibitor.products)
    @JoinColumn({ name: 'exhibitor_id' })
    exhibitor: Exhibitor;
  }
  
