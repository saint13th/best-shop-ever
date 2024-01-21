import { Body, Controller, Delete, Get, Post, Param, Render } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  @Render('sell-cart/sell-cart.ejs')
  getCartPage(@Param('userId') userId: string) {
    return this.cartService.getCartPageData();
  }

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }

  @Delete('/all')
  clearCart() {
    return this.cartService.clearCart();
  }
}
