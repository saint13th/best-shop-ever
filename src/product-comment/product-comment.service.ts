import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ProductCommentService {
  create(createProductCommentDto: CreateProductCommentDto) {
    return 'This action adds a new productComment';
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
