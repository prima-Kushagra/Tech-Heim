import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/users.entity";
import { Product } from "src/products/products.entity";

@Entity()
export class Wishlist {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}