import { Controller, Get, Post, Body, Render, Patch, Param, Delete } from '@nestjs/common';
import { ProductCommentService } from './product-comments.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { ProductsService } from 'src/products/products.service';

@Controller('product-comments')
export class ProductCommentController {
  constructor(
    private readonly productCommentService: ProductCommentService,
    private readonly productsService: ProductsService,
  ) { }

  @Get(':productName')
  @Render('product-comment.ejs')
  findAllByProduct(@Param('productName') productName: string) {
    return this.productCommentService.findAllByProduct(productName, this.productsService);
  }

  @Post()
  create(@Body() createProductCommentDto: CreateProductCommentDto) {
    const userName = ''; // TODO: userName

    return this.productCommentService.create(createProductCommentDto, userName);
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
