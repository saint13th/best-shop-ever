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

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Ненадёжный пароль',
    })
    password: string;
}
