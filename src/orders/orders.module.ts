import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './orders.entity';
import { OrderItem } from 'src/order-item/order-item.entity';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/products/products.entity';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,   
      Cart,
      Product
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}