import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';

describe('CartController', () => {
  let controller: CartController;
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
      controllers: [CartController],
      providers: [
        CartService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: getModelToken(Product.name), useValue: productModel },
        { provide: getModelToken(Cart.name), useValue: cartModel },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
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
