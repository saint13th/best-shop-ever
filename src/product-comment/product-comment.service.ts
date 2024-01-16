import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateProductCommentDto} from './dto/create-product-comment.dto';
import {UpdateProductCommentDto} from './dto/update-product-comment.dto';
import {ProductService} from 'src/product/product.service';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "../product/schemas/product.schema";
import mongoose from "mongoose";

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
        const {productName, commentText, rating} = createProductCommentDto;

        if (!productName) {
            throw new UnauthorizedException('Пользователь не авторизован!')
        }

        return this.productModel.findOneAndUpdate({name: productName}, {
            $push: {
                comments: {
                    userName,
                    text: commentText,
                }
            }
        });
    }

    async findAllByProduct(productName: string, productService: ProductService) {
        const result = await productService.findOne(productName);

        return {
            productName,
            productTitle: result.product.title,
            comments: result.product.comments
        }
    }

    update(id: number, updateProductCommentDto: UpdateProductCommentDto) {
        return `This action updates a #${id} productComment`;
    }

    remove(id: number) {
        return `This action removes a #${id} productComment`;
    }
}
