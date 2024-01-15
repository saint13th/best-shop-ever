import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':name')
  @Render('products-item.ejs')
  findOneByName(@Param('name') name: string) {
    return this.productService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
