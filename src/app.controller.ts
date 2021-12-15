import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return "Hello World!";
  }

  @Post('auth/login')
  login(@Request() req) {1
    return this.authService.login(req.body.username, req.body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
