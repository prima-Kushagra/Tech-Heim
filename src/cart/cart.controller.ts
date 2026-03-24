import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-card.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {

  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'Get all carts (all users)' })
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Get cart of a specific user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(+userId);
  }

  @ApiOperation({ summary: 'Add a product to a specific user\'s cart' })
  @ApiParam({ name: 'userId', example: 1 })
  @Post(':userId')
  addToCart(@Param('userId') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(+userId, dto);
  }

  @ApiOperation({ summary: 'Remove a specific cart item by cart item id' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }

  @ApiOperation({ summary: 'Clear entire cart of a user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}
