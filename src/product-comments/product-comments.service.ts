import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { ProductsService } from '../products/products.service';
import { Product } from "../products/schemas/product.schema";

@Injectable()
export class ProductCommentService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ) {
    }


    async create(
        createProductCommentDto: CreateProductCommentDto,
        userName: string
    ) {
        const { productName, commentText, rating } = createProductCommentDto;

        if (!productName) {
            throw new UnauthorizedException('Пользователь не авторизован!')
        }

        return this.productModel.findOneAndUpdate({ name: productName }, {
            $push: {
                comments: {
                    _id: new mongoose.Types.ObjectId(),
                    userName,
                    text: commentText,
                }
            }
        });
    }

    async findAllByProduct(productName: string, productService: ProductsService) {
        const result = await productService.findAll({ name: productName });

        return {
            productName,
            productTitle: result.at(0).title,
            comments: result.at(0).comments
        }
    }

    update(id: number, updateProductCommentDto: UpdateProductCommentDto) {
        return `This action updates a #${id} productComment`;
    }

    remove(id: number) {
        return `This action removes a #${id} productComment`;
    }
}
