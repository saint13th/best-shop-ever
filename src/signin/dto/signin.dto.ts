import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
    IsEmail,
  } from 'class-validator';

export class SigninDto {
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
