import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';

describe('ChatService', () => {
  let service: ChatService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let chatModel: Model<Chat>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    chatModel = mongoConnection.model(Chat.name, ChatSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getModelToken(Chat.name), useValue: chatModel },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
