import {
  Body,
  Controller,
  ConflictException,
  BadRequestException,
  Delete,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.userService.insert(body);
    } catch {
      throw new ConflictException();
    }
  }

  @Delete()
  async delete(@Body('id') id: string) {
    try {
      return await this.userService.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
