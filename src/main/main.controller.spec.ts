import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';

describe('MainController', () => {
  let controller: MainController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let productModel: Model<Product>;
  let cartModel: Model<Cart>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    productModel = mongoConnection.model(Product.name, ProductSchema);
    cartModel = mongoConnection.model(Cart.name, CartSchema);

    const module: TestingModule = await Test.createTestingModule({
      imports: [jest.fn(), jest.fn(), jest.fn()],
      controllers: [MainController],
      providers: [
        MainService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: getModelToken(Product.name), useValue: productModel },
        { provide: getModelToken(Cart.name), useValue: cartModel },
        { provide: ProductsService, useValue: jest.fn() },
        { provide: CartService, useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<MainController>(MainController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
