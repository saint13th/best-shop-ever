import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
export type TCategory = {
  categoryId: string;
  value: string;
}

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  category?: TCategory;

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