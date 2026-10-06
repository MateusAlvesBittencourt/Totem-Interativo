import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn({ name: 'admin_id' })
  id: number;

  @Column({ name: 'code', type: 'text' })
  code: string;
}