import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/order-item/order-item.entity';
import { Cart } from 'src/cart/cart.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  async createOrder(userId: number) {

    const cartItems = await this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const order = this.orderRepo.create({
      user: { id: userId } as any,
      totalPrice: 0,
      status: "placed",
    });

    const savedOrder = await this.orderRepo.save(order);

    let totalPrice = 0;

    for (const item of cartItems) {

      const price = Number(item.product.price) * item.quantity;
      totalPrice += price;

      const orderItem = this.orderItemRepo.create({
        order: savedOrder,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      });

      await this.orderItemRepo.save(orderItem);
    }

    savedOrder.totalPrice = totalPrice;
    await this.orderRepo.save(savedOrder);

    await this.cartRepo.delete({ user: { id: userId } });

    return savedOrder;
  }

  // Admin: get all orders across all users
  findAllOrders() {
    return this.orderRepo.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  // Admin: get orders of a specific user
  findOrdersByUser(userId: number) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  // Admin: update order status (placed, shipped, delivered, cancelled)
  async updateOrderStatus(orderId: number, status: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    order.status = status;
    return this.orderRepo.save(order);
  }

  // Admin: delete an order
  deleteOrder(orderId: number) {
    return this.orderRepo.delete(orderId);
  }
}
