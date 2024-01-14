import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
    @Prop()
    userId: string;

    @Prop()
    products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart)