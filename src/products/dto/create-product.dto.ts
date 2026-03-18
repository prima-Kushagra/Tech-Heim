import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {

  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Latest Apple flagship phone' })
  @IsString()
  description: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({ example: 10, description: 'Discount percentage (0-100)' })
  @IsOptional()
  @IsNumber()
  discount?: number;
}
