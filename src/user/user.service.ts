import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async insert(user: CreateUserDto) {
    const password = await hash(user.password, 10);
    const response = this.userRepository.insert({ ...user, password });
    return response;
  }

  async findOne(user: Partial<User>) {
    return this.userRepository.findOne(user);
  }
}
