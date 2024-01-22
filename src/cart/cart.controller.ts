import { Body, Controller, Delete, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('cart')
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

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
