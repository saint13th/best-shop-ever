import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  rating: string;

  @Prop()
  image?: string;

  @Prop()
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  specs?: {
    name: string;
    value: string;
  }[];

  @Prop()
  comments?: {
    userId: string;
    userName: string;
    text: string;
  }[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);