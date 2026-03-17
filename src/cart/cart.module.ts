import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart ,Product])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule { }
