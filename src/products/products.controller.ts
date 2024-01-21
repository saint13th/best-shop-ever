import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  findAll(@Query() query) {
    return this.productService.findAll(query);
  }

  @Get(':name')
  @Render('products-item.ejs')
  getProductsPage(@Param('name') name: string) {
    return this.productService.findOneByName(name);
  }
}
