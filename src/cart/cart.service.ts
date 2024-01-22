import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: mongoose.Model<Cart>,
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ) { }

  async getCart(): Promise<{ cart: Cart }> {
    const userId = '65aaa68952cc08569f2be370'; // TODO: session userId

    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const cart = await this.cartModel.findOne({ userId });

    return { cart };
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const userId = '65aaa68952cc08569f2be370'; // TODO: session userId

    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const foundCart = await this.cartModel.findOne({ userId });
    const product = await this.productModel.findOne({ _id: addToCartDto.productId });

    if (!product) {
      throw new NotFoundException('Товар не найден!')
    }

    if (!foundCart) {
      const createdCart = await this.cartModel.create({
        userId,
        products: [product],
      });

      return createdCart;
    } else {
      foundCart.products.push(product);
      foundCart.save()

      return foundCart;
    }
  }

  async removeFromCart(productId: string) {
    const userId = '65aaa68952cc08569f2be370'; // TODO: session userId
    const curProductId = new ObjectId(productId);

    return this.cartModel.findOneAndUpdate(
      { userId },
      {
        $pull: {
          products: { _id: curProductId }
        },
      },
      { new: true },
    );
  }

  async clearCart() {
    const userId = '65aaa68952cc08569f2be370'; // TODO: session userId

    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException('Корзина не найдена!')
    } else {
      cart.updateOne({ $set: { products: [] } });
      cart.save();

      return cart;
    }
  }
}
