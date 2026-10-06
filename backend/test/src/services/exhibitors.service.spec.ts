import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitorsService } from '../../../src/services/exhibitors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exhibitor } from '../../../src/entities/exhibitor.entity';
import { Repository } from 'typeorm';

describe('ExhibitorsService', () => {
  let service: ExhibitorsService;
  let repo: Repository<Exhibitor>;

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExhibitorsService,
        {
          provide: getRepositoryToken(Exhibitor),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ExhibitorsService>(ExhibitorsService);
    repo = module.get<Repository<Exhibitor>>(getRepositoryToken(Exhibitor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
