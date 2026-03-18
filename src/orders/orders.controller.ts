import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {

  constructor(private orderService: OrdersService) {}

  // Admin: create an order for a specific user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post(':userId')
  createOrder(@Param('userId') userId: string) {
    return this.orderService.createOrder(+userId);
  }

  // Admin: get all orders (all users)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllOrders() {
    return this.orderService.findAllOrders();
  }

  // Admin: get orders of a specific user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('user/:userId')
  getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.findOrdersByUser(+userId);
  }

  // Admin: update order status (placed → shipped → delivered / cancelled)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(+id, dto.status);
  }

  // Admin: delete an order
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
