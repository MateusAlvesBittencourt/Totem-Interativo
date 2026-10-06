import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Totem } from './totem.entity';
import { Exhibitor } from './exhibitor.entity';
import { Subcategory } from './subcategory.entity';
import { Category } from './category.entity';

@Entity('Lead')
export class Lead {
  @PrimaryGeneratedColumn({ name: 'lead_id', type: 'integer' })
  leadId: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'profession', nullable: true })
  profession: string | null;

  @Column('text', { name: 'company', nullable: true })
  company: string | null;

  @Column('text', { name: 'business_area', nullable: true })
  businessArea: string | null;

  @Column('text', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('text', { name: 'email', nullable: true })
  email: string | null;

  @Column('json', { name: 'interesses', nullable: true })
  interesses: Record<string, any> | null;

  @ManyToOne(() => Totem, (totem) => totem.leads)
  @JoinColumn({ name: 'totem_id', referencedColumnName: 'totemId' })
  totem: Totem;

  @ManyToOne(() => Exhibitor, (exhibitor) => exhibitor.leads)
  @JoinColumn({ name: 'exhibitor_id', referencedColumnName: 'exhibitorId' })
  exhibitor: Exhibitor;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.leads)
  @JoinColumn({ name: 'subcategory_id', referencedColumnName: 'subcategoryId' })
  subcategory: Subcategory;

  @ManyToOne(() => Category, (category) => category.leads)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'categoryId' })
  category: Category;
}
