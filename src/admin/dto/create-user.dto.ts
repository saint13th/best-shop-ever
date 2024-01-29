import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
    IsEmail,
    IsOptional,
} from 'class-validator';
import { UserRole } from '../../users/schemas/user.schema';

export class CreateUserDto {
    @IsNotEmpty()
    roles: UserRole[];

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Ненадёжный пароль',
    })
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    image: string;
}
