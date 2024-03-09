import { IsNotEmpty } from "class-validator";
import { Product } from "../../products/schemas/product.schema";

export class CreateOrderDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    products: Product[];

    @IsNotEmpty()
    totalSumm: number;
}
