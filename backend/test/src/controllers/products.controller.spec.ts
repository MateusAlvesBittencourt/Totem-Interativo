import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/controllers/products.controller';
import { Product } from '../../../src/entities/product.entity';
import { Like, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsController', () => {
  let controller: ProductsController;
  let repo: Repository<Product>;

  const mockProductRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should return all products', async () => {
    const result = [{ productId: 1, productName: 'Test Product' }];
    mockProductRepository.find.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return a product by ID', async () => {
    const product = { productId: 1, productName: 'Test Product' };
    mockProductRepository.findOneBy.mockResolvedValue(product);

    expect(await controller.findOne(1)).toEqual(product);
  });

  it('should return products by name', async () => {
    const result = [{ productId: 1, productName: 'Test Product' }];
    mockProductRepository.find.mockResolvedValue(result);

    expect(await controller.findByName('Test')).toEqual(result);
    expect(mockProductRepository.find).toHaveBeenCalledWith({
      where: { productName: Like('%Test%') },
    });
  });
});

