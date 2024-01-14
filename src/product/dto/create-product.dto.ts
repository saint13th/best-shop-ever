import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  rating: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  shortDescription: string;

  @IsOptional()
  specs: {
    name: string;
    value: string;
  }[];

  @IsOptional()
  comments: {
    user: string;
    text: string;
  }[];
}
