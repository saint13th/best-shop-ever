import { IsNotEmpty } from 'class-validator';

export class SetMessageDto {
    @IsNotEmpty()
    message: string;
}
