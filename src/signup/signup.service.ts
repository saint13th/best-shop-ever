import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from "../users/users.service";
import { UserRole } from "../users/schemas/user.schema";

@Injectable()
export class SignupService {
  async signUp(signupDto: SignupDto, userService: UsersService) {
    return await userService.signUp(signupDto)
  }
}
