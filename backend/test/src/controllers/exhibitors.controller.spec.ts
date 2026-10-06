import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitorsController } from '../../../src/controllers/exhibitors.controller';
import { ExhibitorsService } from '../../../src/services/exhibitors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exhibitor } from '../../../src/entities/exhibitor.entity';

describe('ExhibitorsController', () => {
  let controller: ExhibitorsController;
  let service: ExhibitorsService;

  const mockExhibitorRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockExhibitorsService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Expositor Teste' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExhibitorsController],
      providers: [
        {
          provide: ExhibitorsService,
          useValue: mockExhibitorsService,
        },
        {
          provide: getRepositoryToken(Exhibitor),
          useValue: mockExhibitorRepository,
        },
      ],
    }).compile();

    controller = module.get<ExhibitorsController>(ExhibitorsController);
    service = module.get<ExhibitorsService>(ExhibitorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


