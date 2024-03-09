import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/schemas/product.schema';

@Schema()
export class Order {
    @ApiProperty()
    @Prop()
    userId: string;

    @ApiProperty()
    @Prop()
    products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order)