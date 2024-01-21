import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('signin')
export class SigninController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @Render('login.ejs')
  root() {
    return { isSignIn: true, isSignUp: false, type: 'signin' };
  }
}
