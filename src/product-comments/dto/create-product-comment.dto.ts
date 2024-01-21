import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateProductCommentDto {
    @IsNotEmpty()
    productName: string;

    @IsOptional()
    rating?: number;

    @IsNotEmpty()
    commentText: string;
}
