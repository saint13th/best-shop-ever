import { Controller, Get, Param, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';


@ApiTags('main (pages)')
@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly productService: ProductsService,
    private readonly cartService: CartService,
  ) { }

  @Get()
  @Render('index.ejs')
  getMainPage() {
    return this.mainService.getMainPageData(this.productService);
  }

  @Get('signin')
  @Render('login.ejs')
  getSignInPage() {
    return { isSignIn: true, isSignUp: false, type: 'signin' };
  }

  @Get('signup')
  @Render('login.ejs')
  getSignUpPage() {
    return { isSignIn: false, isSignUp: true, type: 'signup' };
  }

  @Get('products/:name')
  @Render('products-item.ejs')
  getProductsPage(@Param('name') name: string) {
    return this.mainService.getProductsPageData(name, this.productService);
  }

  @Get('product-comments/:productName')
  @Render('product-comment.ejs')
  findAllByProduct(@Param('productName') productName: string) {
    return this.mainService.getProductCommentsPageData(productName, this.productService);
  }

  @Get('cart')
  @Render('sell-cart/sell-cart.ejs')
  getCartPage() {
    return this.mainService.getCartPageData(this.cartService);
  }

  @Get('admin')
  @Render('admin/index.ejs')
  getAdminPage() {
    return {};
  }

  @Get('admin/users-create')
  @Render('admin/users/users-create.ejs')
  getAdminUsersCreatePage() {
    return {};
  }

  @Get('admin/products-create')
  @Render('admin/products/products-create.ejs')
  getAdminProductsPage() {
    return {};
  }
}
