import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddToCartDto } from './dto/add-to-card.dto';

@Controller('cart')
export class CartController {

  constructor(private cartService: CartService) {}

  // Admin: get all carts (all users)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  // Admin: get cart of a specific user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(+userId);
  }

  // Admin: add product to a specific user's cart
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post(':userId')
  addToCart(@Param('userId') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(+userId, dto);
  }

  // Admin: remove a specific cart item
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }

  // Admin: clear entire cart of a user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}
