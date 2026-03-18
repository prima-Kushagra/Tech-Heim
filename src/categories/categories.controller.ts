import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  constructor(private categoryService: CategoriesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Create a new category' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @ApiOperation({ summary: 'Public: Get all categories' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Public: Get a single category' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete a category' })
  @ApiParam({ name: 'id', example: 1 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }
}
