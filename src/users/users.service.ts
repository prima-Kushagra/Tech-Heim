import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  findUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  createUser(user: User) {
    return this.userRepository.save(user);
  }

  updateUser(id: number, user: User) {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}