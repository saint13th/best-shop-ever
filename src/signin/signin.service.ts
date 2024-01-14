import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SigninService {
  async signIn(signinDto: SigninDto, userService: UserService) {
    const user = await userService.findOne(signinDto.email);

    return user;
  }
}
