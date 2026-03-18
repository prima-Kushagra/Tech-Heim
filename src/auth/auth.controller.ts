import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ schema: { example: { name: 'John', email: 'john@example.com', password: '123456' } } })
  @Post('signup')
  signup(@Body() dto: any) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Login and get access token' })
  @ApiBody({ schema: { example: { email: 'john@example.com', password: '123456' } } })
  @Post('login')
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
