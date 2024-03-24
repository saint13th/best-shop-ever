import { IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsString()
  commentId: string;

  @IsString()
  productId: string;

}
