import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Cart',
        schema: CartSchema
      }]
    ),
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
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
