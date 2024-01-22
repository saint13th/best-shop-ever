import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  signUp(@Body() user: SignUpDto) {
    return this.userService.signUp(user);
  }
}
