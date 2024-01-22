import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { ProductCommentController } from './product-comments.controller';
import { ProductCommentService } from './product-comments.service';
import { Product, ProductSchema } from '../products/schemas/product.schema';

describe('ProductCommentController', () => {
  let controller: ProductCommentController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let productModel: Model<Product>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    productModel = mongoConnection.model(Product.name, ProductSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCommentController],
      providers: [
        ProductCommentService,
        { provide: getModelToken(Product.name), useValue: productModel },
      ],
    }).compile();

    controller = module.get<ProductCommentController>(ProductCommentController);
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
