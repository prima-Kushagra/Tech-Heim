import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddToCartDto } from './dto/add-to-card.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('cart')
export class CartController {

  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'Admin: Get all carts (all users)' })
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Admin: Get cart of a specific user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(+userId);
  }

  @ApiOperation({ summary: 'Admin: Add a product to a specific user\'s cart' })
  @ApiParam({ name: 'userId', example: 1 })
  @Post(':userId')
  addToCart(@Param('userId') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(+userId, dto);
  }

  @ApiOperation({ summary: 'Admin: Remove a specific cart item by cart item id' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }

  @ApiOperation({ summary: 'Admin: Clear entire cart of a user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}
