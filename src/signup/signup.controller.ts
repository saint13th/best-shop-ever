import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Get()
  @Render('login.ejs')
  root() {
    return { isSignIn: false, isSignUp: true, type: 'signup' };
  }

  @Post()
  signUp(@Body() SignupDto: SignupDto) {
    return this.signupService.signUp(SignupDto);
  }
}
