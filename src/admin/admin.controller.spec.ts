import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';

describe('AdminController', () => {
  let controller: AdminController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let productModel: Model<Product>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    productModel = mongoConnection.model(Product.name, ProductSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: getModelToken(Product.name), useValue: productModel },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
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
