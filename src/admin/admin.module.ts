import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductSchema } from 'src/products/schemas/product.schema';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forFeature(
      [{
        name: 'User',
        schema: UserSchema
      }]
    ),
    MongooseModule.forFeature(
      [{
        name: 'Product',
        schema: ProductSchema
      }]
    )
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
