import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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



  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  createUser(dto: CreateUserDto){
    return this.userRepository.save(dto);
}

updateUser(id:number,dto:UpdateUserDto){
    return this.userRepository.update(id,dto);
}
}