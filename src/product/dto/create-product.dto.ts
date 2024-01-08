import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  rating: string;

  @IsOptional()
  image?: {
    fileName: string;
  };

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  shortDescription: string;
}
