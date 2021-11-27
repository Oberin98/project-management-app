import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

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

  // TEMP //
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
