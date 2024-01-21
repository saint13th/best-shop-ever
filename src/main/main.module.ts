import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
