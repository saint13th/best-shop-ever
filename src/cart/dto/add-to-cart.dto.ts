import { IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from 'src/product/schemas/product.schema';

export class AddToCartDto {
    @IsNotEmpty()
    product: Product;
}
