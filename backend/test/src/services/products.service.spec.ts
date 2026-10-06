import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../../src/services/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../../src/entities/product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockProductRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const result = [{ productId: 1, productName: 'Test Product' }];
    mockProductRepository.find.mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should delete a product', async () => {
    mockProductRepository.delete.mockResolvedValue(undefined);

    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
