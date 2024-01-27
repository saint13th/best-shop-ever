import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    async signIn(@Body() signInDto: SignInDto, @Req() req: Request, @Res({ passthrough: true }) res: FastifyReply) {
        const result = await this.authService.signIn(signInDto);

        res.setCookie('access_token', result.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
            path: '/'
        }).send({ status: 'ok' });
    }

    @UseGuards(JwtAuthGuard)
    @Post('signOut')
    async signOut(@Res({ passthrough: true }) res: FastifyReply) {
        res.clearCookie('access_token').send({ status: 'ok' });
    }

    @Post('signUp')
    signUp(@Body() SignupDto: SignupDto) {
        return this.authService.signUp(SignupDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return this.authService.getProfile(req.user.username);
    }
}
