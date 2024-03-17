import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class UpdateCommentDto {
    @IsString()
    commentId: string;

    @IsString()
    userName: string;

    @IsString()
    text: string;
}
