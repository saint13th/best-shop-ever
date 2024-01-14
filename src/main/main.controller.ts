import { Controller, Get, Render } from '@nestjs/common';
import { MainService } from './main.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) { }

  @Get()
  @Render('index.ejs')
  root() {
    return this.mainService.getData(this.userService, this.productService);
  }
}
