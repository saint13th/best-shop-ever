import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [UsersModule, ProductsModule, CartModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }
