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

  @Column({ type: "decimal", precision: 10, scale: 2 })
price: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}