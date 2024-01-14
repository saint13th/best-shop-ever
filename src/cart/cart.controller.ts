import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  addToCart(@Body() createCartDto: AddToCartDto) {
    return this.cartService.addToCart(createCartDto.product, ''); // TODO: userId
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(id, '');
  }

  @Delete('/all')
  clearCart() {
    return this.cartService.clearCart();
  }
}
