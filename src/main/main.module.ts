import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [UsersModule, ProductsModule, CartModule, UsersModule, ChatModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }
