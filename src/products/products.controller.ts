import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Create a new product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @ApiOperation({ summary: 'Public: Get all products' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Public: Get a single product' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update product (price, discount, stock, etc.)' })
  @ApiParam({ name: 'id', example: 1 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete a product' })
  @ApiParam({ name: 'id', example: 1 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
