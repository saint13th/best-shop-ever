import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { SignInDto } from "./dto/signIn.dto";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByEmail(signInDto.email);

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    // @ts-ignore
    const payload = { sub: user._id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: SignupDto) {
    return await this.userService.signUp(signupDto)
  }
}
