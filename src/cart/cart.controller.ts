import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-card.dto';

@Controller('cart')
export class CartController {

  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(@Req() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }
}