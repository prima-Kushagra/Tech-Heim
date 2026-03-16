import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/users.entity";

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column("decimal")
  totalPrice: number;

  @Column({ default: "pending" })
  status: string;

  @Column()
  createdAt: Date;
}