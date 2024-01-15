import { Controller, Get, Post, Body, Render, Patch, Param, Delete } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { ProductService } from 'src/product/product.service';

@Controller('product-comment')
export class ProductCommentController {
  constructor(
    private readonly productCommentService: ProductCommentService,
    private readonly productService: ProductService,
  ) { }

  @Post()
  create(@Body() createProductCommentDto: CreateProductCommentDto) {
    const userName = ''; // TODO: userName

    return this.productCommentService.create(createProductCommentDto, userName);
  }

  @Get(':productName')
  @Render('product-comment.ejs')
  findAllByProduct(@Param('productName') productName: string) {
    return this.productCommentService.findAllByProduct(productName, this.productService);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCommentDto: UpdateProductCommentDto) {
    return this.productCommentService.update(+id, updateProductCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCommentService.remove(+id);
  }
}
