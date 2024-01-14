import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class SignupService {
  signUp(signupDto: SignupDto) {
    return 'This action adds a new signup';
  }

  findAll() {
    return `This action returns all signup`;
  }
}
