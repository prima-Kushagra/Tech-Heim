import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateProductDto) {

    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const product = this.productRepo.create({
      ...dto,
      category,
    });

    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({
      relations: ['category'],
    });
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: number, dto: UpdateProductDto) {
    return this.productRepo.update(id, dto);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
