import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { MainModule } from './main/main.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProductModule,
    SigninModule,
    SignupModule,
    UserModule,
    MainModule,
    ProductCommentModule,
    CartModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
