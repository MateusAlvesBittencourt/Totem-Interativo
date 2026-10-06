import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../src/controllers/app.controller';
import { AppService } from '../../../src/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: 'CategoryRepository', useValue: {} },
        { provide: 'SubcategoryRepository', useValue: {} },
        { provide: 'ExhibitorRepository', useValue: {} },
        { provide: 'LeadRepository', useValue: {} }, // Ensure this token matches the one used in AppController's constructor
        { provide: 'TotemRepository', useValue: {} },
        { provide: 'AdminRepository', useValue: {} },
        { provide: 'ProductRepository', useValue: {} },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
  });
});
