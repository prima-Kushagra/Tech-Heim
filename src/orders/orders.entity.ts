import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { OrderItem } from "src/order-item/order-item.entity";
import { User } from "src/users/users.entity";

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}