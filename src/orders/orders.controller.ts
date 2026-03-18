import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {

  constructor(private orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Req() req) {
    return this.orderService.createOrder(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(@Req() req) {
    return this.orderService.findOrders(req.user.userId);
  }
}