import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';

describe('MainController', () => {
  let controller: MainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, ProductsModule, CartModule],
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    controller = module.get<MainController>(MainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
