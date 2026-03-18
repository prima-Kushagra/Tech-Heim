import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Main St, New York' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'admin', description: 'user | admin' })
  @IsOptional()
  @IsString()
  role?: string;
}
