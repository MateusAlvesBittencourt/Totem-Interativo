import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from '../entities/lead.entity';

@Entity('Totem')
export class Totem {
  @PrimaryGeneratedColumn({ name: 'totem_id', type: 'integer' })
  totemId: number;

  @OneToMany(() => Lead, (lead) => lead.totem)
  leads: Lead[];
}
