import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: mongoose.Model<Cart>
  ) { }

  async addToCart(product: Product, userId: string): Promise<Cart> {
    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const resultFind = await this.cartModel.findOne({ userId });

    if (!resultFind) {
      const resultCreate = await this.cartModel.create({
        userId,
        products: [product],
      });

      return resultCreate;
    } else {
      resultFind.products.push(product);

      return resultFind;
    }
  }

  async removeFromCart(id: string, userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const resultFind = await this.cartModel.findOne({ userId });

    if (!resultFind) {
      throw new NotFoundException('Корзина не найдена!')
    } else {
      // @ts-ignore
      const result = resultFind.products.filter((product) => product._id !== id)

      return result;
    }
  }

  clearCart() {
    return `This action removes all items in cart`;
  }
}
