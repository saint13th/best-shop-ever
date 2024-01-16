import {Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInDto} from './dto/signIn.dto';
import {AuthGuard} from "./guards/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
