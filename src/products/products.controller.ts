import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  findAll(@Query() query) {
    return this.productService.findAll(query);
  }
}
