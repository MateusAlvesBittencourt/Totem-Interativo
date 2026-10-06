import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exhibitor } from './exhibitor.entity';
import { Category } from './category.entity';
import { Lead } from './lead.entity';
import { Product } from './product.entity';

@Entity("Subcategory")
export class Subcategory {
  @PrimaryGeneratedColumn( { name: "subcategory_id"})
  subcategoryId: number | null;

  @Column('text', { name: 'subcategory_name', nullable: true })
  name: string | null;

  @ManyToMany(() => Exhibitor, (exhibitor) => exhibitor.subcategories)
  exhibitors: Exhibitor[];

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToMany(() => Category, (category) => category.subcategories)
  @JoinTable({
    name: "Category_Subcategory",
    joinColumns: [
      { name: "subcategory_id", referencedColumnName: "subcategoryId" },
    ],
    inverseJoinColumns: [
      { name: "category_id", referencedColumnName: "categoryId" },
    ],
  })
  categories: Category[];
/*
  @ManyToMany(() => Product, (product) => product.subcategories)
  @JoinTable({
    name: "Product_Subcategory",
    joinColumns: [
      { name: "subcategory_id", referencedColumnName: "subcategoryId" },
    ],
    inverseJoinColumns: [
      { name: "product_id", referencedColumnName: "productId" },
    ],
  })
  products: Product[];*/

  @OneToMany(() => Lead, (lead) => lead.subcategory)
  leads: Lead[];

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}

