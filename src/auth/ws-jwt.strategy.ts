import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                WsJwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWT(request): string {

        if (
            request.headers &&
            request.headers?.cookie?.length > 0
        ) {
            const cookiesArr = request.headers?.cookie.split('; ').map((str) => {
                const stringArr = str.split('=');
                const [name, value] = stringArr;

                return { name, value };
            });
            const accessToken = cookiesArr.find(({ name }) => name === 'access_token')?.value;

            if (accessToken) return accessToken;
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