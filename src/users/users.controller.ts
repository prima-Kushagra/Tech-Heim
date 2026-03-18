import { Controller, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Admin: Get all users' })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Admin: Get a single user' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findUser(+id);
  }

  @ApiOperation({ summary: 'Admin: Update user (name, email, address, role, etc.)' })
  @ApiParam({ name: 'id', example: 1 })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(+id, dto);
  }

  @ApiOperation({ summary: 'Admin: Delete a user' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
