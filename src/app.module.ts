import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UsersModule } from './users/users.module';
import { MainModule } from './main/main.module';
import { ProductCommentModule } from './product-comments/product-comments.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProductsModule,
    SigninModule,
    SignupModule,
    UsersModule,
    MainModule,
    ProductCommentModule,
    CartModule,
    AuthModule,
    AdminModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
