import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class Order {
    @Prop()
    userId: string;

    @Prop()
    products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order)