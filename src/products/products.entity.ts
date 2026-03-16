import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "src/categories/categories.entity";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}