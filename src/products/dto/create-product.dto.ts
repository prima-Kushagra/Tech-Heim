import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  image: string;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  discount?: number;
}