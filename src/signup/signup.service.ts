import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from "../user/user.service";
import { UserRole } from "../user/schemas/user.schema";

@Injectable()
export class SignupService {
  async signUp(signupDto: SignupDto, userService: UserService) {
    return await userService.create({
      ...signupDto,
      role: [UserRole.USER],
      name: ''
    })
  }
}
