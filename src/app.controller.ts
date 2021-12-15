import {Controller, Get, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {Public} from "./public.decorator";

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return "Hello World!";
  }

  @Public()
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.body.username, req.body.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    console.log(req)
    return req.user;
  }

}
