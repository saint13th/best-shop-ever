import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
