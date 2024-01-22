import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProductSchema } from '../products/schemas/product.schema';
import { UserSchema } from '../users/schemas/user.schema';

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
  providers: [
    AdminService,
  ],
})
export class AdminModule { }
