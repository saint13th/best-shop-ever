import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [LoginModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
