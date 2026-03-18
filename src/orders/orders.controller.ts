import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('orders')
export class OrdersController {

  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Admin: Create an order for a specific user from their cart' })
  @ApiParam({ name: 'userId', example: 1 })
  @Post(':userId')
  createOrder(@Param('userId') userId: string) {
    return this.orderService.createOrder(+userId);
  }

  @ApiOperation({ summary: 'Admin: Get all orders (all users)' })
  @Get()
  getAllOrders() {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({ summary: 'Admin: Get all orders of a specific user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Get('user/:userId')
  getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.findOrdersByUser(+userId);
  }

  @ApiOperation({ summary: 'Admin: Update order status (placed / shipped / delivered / cancelled)' })
  @ApiParam({ name: 'id', example: 1 })
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(+id, dto.status);
  }

  @ApiOperation({ summary: 'Admin: Delete an order' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
