import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  findAll(@Query() query) {
    return this.productService.findAll(query);
  }
}
