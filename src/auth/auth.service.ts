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
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token
    };
  }

  async signUp(signupDto: SignupDto) {
    return await this.userService.signUp(signupDto)
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async getProfile(username: string) {
    const { name, email, image, roles } = await this.userService.findByEmail(username);

    return { name, email, image, roles }
  }
}
