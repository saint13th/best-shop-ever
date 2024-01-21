import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from "../users/users.service";

@Controller('signup')
export class SignupController {
  constructor(
      private readonly signupService: SignupService,
      private readonly userService: UsersService,
  ) {}

  @Get()
  @Render('login.ejs')
  root() {
    return { isSignIn: false, isSignUp: true, type: 'signup' };
  }

  @Post()
  signUp(@Body() SignupDto: SignupDto) {
    return this.signupService.signUp(SignupDto, this.userService);
  }
}
