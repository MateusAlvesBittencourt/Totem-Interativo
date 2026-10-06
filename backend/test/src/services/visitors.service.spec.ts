import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsService } from '../../../src/services/visitors.service';
import { CreateVisitorDto } from '../../../src/dtos/create-visitor.dto';
import { UpdateVisitorDto } from '../../../src/dtos/update-visitor.dto';

describe('VisitorsService', () => {
  let service: VisitorsService;

  beforeEach(() => {
    service = new VisitorsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a visitor', () => {
    const dto: CreateVisitorDto = {} as any;
    expect(service.create(dto)).toBe('This action adds a new visitor');
  });

  it('should return all visitors', () => {
    expect(service.findAll()).toBe('This action returns all visitors');
  });

  it('should return one visitor', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 visitor');
  });

  it('should update a visitor', () => {
    const dto: UpdateVisitorDto = {} as any;
    expect(service.update(1, dto)).toBe('This action updates a #1 visitor');
  });

  it('should remove a visitor', () => {
    expect(service.remove(1)).toBe('This action removes a #1 visitor');
  });
});

