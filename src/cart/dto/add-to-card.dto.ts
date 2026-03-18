import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from "class-validator";

export class AddToCartDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;
}
