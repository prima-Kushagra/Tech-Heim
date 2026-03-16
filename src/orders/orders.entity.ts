import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/users/users.entity";
import { OrderItem } from "src/order-item/order-item.entity";
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => OrderItem, (item) => item.order)
    orderItems: OrderItem[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column("decimal")
    totalPrice: number;

    @Column({ default: "pending" })
    status: string;

    @Column()
    createdAt: Date;
}