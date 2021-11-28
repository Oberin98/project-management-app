import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOne({ login });
    const matched = await compare(password, user.password);
    return matched && password ? user : null;
  }

  async login({ login, id }: User) {
    const accessToken = this.jwtService.sign({ login, sub: id });
    return { accessToken };
  }
}
