import { Module } from '@nestjs/common';
import { ProductCommentService } from './product-comments.service';
import { ProductCommentController } from './product-comments.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "../products/schemas/product.schema";
import { ProductsModule } from "../products/products.module";

@Module({
    imports: [
        ProductsModule,
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
