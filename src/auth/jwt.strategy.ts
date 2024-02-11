import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWT(request: FastifyRequest): string {
        if (
            request.cookies &&
            request.cookies?.access_token?.length > 0
        ) {
            return request.cookies.access_token;
        }
        return null;
    }

    async validate(payload: any) {
        if (!payload) {
            return { userId: null, username: null };
        }

        return {
            userId: payload.sub,
            username: payload.username,
            roles: payload?.roles
        };
    }
}