import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('signin')
export class SigninController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  @Render('login.ejs')
  root() {
    return { isSignIn: true, isSignUp: false, type: 'signin' };
  }
}
