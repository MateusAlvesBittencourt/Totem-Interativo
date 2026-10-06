import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibitor } from '../entities/exhibitor.entity';

@Injectable()
export class ExhibitorsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Exhibitor)
    private readonly exhibitorsRepository: Repository<Exhibitor>,
  ) {}

  findAll(): Promise<Exhibitor[]> {
    return this.exhibitorsRepository.find();
  }

  async findOne(id: number): Promise<Exhibitor> {
    const exhibitor = await this.exhibitorsRepository.findOneBy({ exhibitorId: id });
    if (!exhibitor) {
      throw new Error(`Exhibitor with ID ${id} not found.`);
    }
    return exhibitor;
  }

  create(data: Partial<Exhibitor>): Promise<Exhibitor> {
    const category = this.exhibitorsRepository.create(data);
    return this.exhibitorsRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.exhibitorsRepository.delete(id);
  }
}
