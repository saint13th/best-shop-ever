import { Body, Controller, Delete, Post, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cart')
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto, @Req() request) {
    const userId = request.user.userId;

    return this.cartService.addToCart(addToCartDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeFromCart(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId;

    return this.cartService.removeFromCart(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/all')
  clearCart(@Req() request) {
    const userId = request.user.userId;

    return this.cartService.clearCart(userId);
  }
}
