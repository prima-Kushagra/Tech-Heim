import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class UpdateOrderStatusDto {

  @ApiProperty({ example: 'shipped', description: 'placed | shipped | delivered | cancelled' })
  @IsString()
  status: string;
}
