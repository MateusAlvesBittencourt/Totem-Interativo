import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsController } from '../../../src/controllers/visitors.controller';
import { VisitorsService } from '../../../src/services/visitors.service';
import { CreateVisitorDto } from '../../../src/dtos/create-visitor.dto';
import { UpdateVisitorDto } from '../../../src/dtos/update-visitor.dto';


describe('VisitorsController', () => {
  let controller: VisitorsController;
  let service: VisitorsService;

  const mockService = {
    create: jest.fn().mockReturnValue('This action adds a new visitor'),
    findAll: jest.fn().mockReturnValue('This action returns all visitors'),
    findOne: jest.fn().mockImplementation((id: number) => `This action returns a #${id} visitor`),
    update: jest.fn().mockImplementation((id: number) => `This action updates a #${id} visitor`),
    remove: jest.fn().mockImplementation((id: number) => `This action removes a #${id} visitor`),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsController],
      providers: [
        {
          provide: VisitorsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<VisitorsController>(VisitorsController);
    service = module.get<VisitorsService>(VisitorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with correct DTO', () => {
    const dto: CreateVisitorDto = {} as any;
    expect(controller.create(dto)).toBe('This action adds a new visitor');
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all visitors', () => {
    expect(controller.findAll()).toBe('This action returns all visitors');
  });

  it('should return one visitor', () => {
    expect(controller.findOne('1')).toBe('This action returns a #1 visitor');
  });

  it('should update a visitor', () => {
    const dto: UpdateVisitorDto = {} as any;
    expect(controller.update('1', dto)).toBe('This action updates a #1 visitor');
  });

  it('should remove a visitor', () => {
    expect(controller.remove('1')).toBe('This action removes a #1 visitor');
  });
});

