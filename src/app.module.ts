import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItemService } from './order-item/order-item.service';

@Module({
  imports: [AuthModule, ProductsModule, CartModule, OrdersModule, CategoriesModule, WishlistModule, ReviewsModule, UsersModule ,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'Kushagr@123',
      database: 'techheim',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderItemModule,
  ],
  controllers: [AppController, CartController, OrdersController, OrderItemController],
  providers: [AppService, CartService, OrdersService, UsersService, OrderItemService],
})
export class AppModule {}
