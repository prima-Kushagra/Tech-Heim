import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "src/orders/orders.entity";
import { Product } from "src/products/products.entity";

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;
}