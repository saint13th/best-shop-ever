import { Controller, Get, Render } from '@nestjs/common';
import { MainService } from './main.service';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) { }

  @Get()
  @Render('index.ejs')
  root() {
    return this.mainService.getData(this.userService, this.productService);
  }
}
