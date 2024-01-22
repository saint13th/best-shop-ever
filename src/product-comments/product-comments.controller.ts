import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductCommentService } from './product-comments.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';

@ApiTags('product-comments')
@Controller('api/v1/product-comments')
export class ProductCommentController {
  constructor(
    private readonly productCommentService: ProductCommentService,
  ) { }

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
