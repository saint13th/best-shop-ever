import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  signUp(createLoginDto: SignUpDto) {
    return 'This action signUp';
  }

  signIn(createLoginDto: SignInDto) {
    return 'This action signIn';
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
