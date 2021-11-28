import {
  Controller,
  Body,
  ConflictException,
  BadRequestException,
  Delete,
  Put,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async user(@Query() query: Partial<User>) {
    try {
      return await this.userService.findOne(query);
    } catch {
      throw new NotFoundException();
    }
  }
}
