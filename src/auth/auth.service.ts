import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private readonly ADMIN_EMAILS = [
    'jimmy.smith1996@gmail.com',
  ];

  async signup(dto: any) {

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const role = this.ADMIN_EMAILS.includes(dto.email?.toLowerCase())
      ? 'admin'
      : 'user';

    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
      role,
    });

    return user;
  }

  async login(dto: any) {

  const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}