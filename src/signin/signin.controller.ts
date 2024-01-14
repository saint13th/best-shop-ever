import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';

@Controller('signin')
export class SigninController {
  constructor(
    private readonly signinService: SigninService,
    private readonly userService: UserService,
  ) { }

  @Get()
  @Render('login.ejs')
  root() {
    return { isSignIn: true, isSignUp: false, type: 'signin' };
  }

  @Post()
  signIn(@Body() signinDto: SigninDto) {
    return this.signinService.signIn(signinDto, this.userService);
  }
}
