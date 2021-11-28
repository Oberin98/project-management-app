import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthorizedRequest) {
    return this.authService.login(req.user);
  }
}
