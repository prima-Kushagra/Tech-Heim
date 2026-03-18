import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-card.dto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToCart(userId: number, dto: AddToCartDto) {

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${dto.productId} not found`);
    }

    const existing = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: dto.productId },
      },
      relations: ['user', 'product'],
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartRepo.save(existing);
    }

    const cartItem = this.cartRepo.create({
      user: { id: userId },
      product: { id: dto.productId },
      quantity: dto.quantity,
    });

    return this.cartRepo.save(cartItem);
  }

  // Admin: get all carts across all users
  getAllCarts() {
    return this.cartRepo.find({
      relations: ['user', 'product'],
    });
  }

  // Admin: get cart of a specific user
  getCart(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'product'],
    });
  }

  // Admin: remove a specific cart item by cart id
  removeFromCart(id: number) {
    return this.cartRepo.delete(id);
  }

  // Admin: clear entire cart of a user
  clearCart(userId: number) {
    return this.cartRepo.delete({ user: { id: userId } });
  }
}
