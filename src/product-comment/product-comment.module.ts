import { Module } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { ProductCommentController } from './product-comment.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "../product/schemas/product.schema";
import {ProductModule} from "../product/product.module";

@Module({
    imports: [
        ProductModule,
        MongooseModule.forFeature(
            [{
                name: 'Product',
                schema: ProductSchema
            }]
        ),],
    controllers: [ProductCommentController],
    providers: [ProductCommentService],
})
export class ProductCommentModule {
}
