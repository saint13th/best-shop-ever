import { Controller, Get, Param, Query, Render, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthWithoutExceptionsGuard } from '../auth/guards/jwt-auth-without-exceptions.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';


@ApiTags('main (pages)')
@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly productService: ProductsService,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get()
  @Render('index.ejs')
  getMainPage(@Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getMainPageData(
      this.usersService,
      this.productService,
      '',
      currentUser
    );
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('search')
  @Render('index.ejs')
  getSearchPage(@Query() query, @Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getMainPageData(
      this.usersService,
      this.productService,
      query,
      currentUser,
    );
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('signin')
  @Render('login.ejs')
  getSignInPage(@Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getSignInPageData(this.usersService, currentUser);
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('signup')
  @Render('login.ejs')
  getSignUpPage(@Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getSignUpPageData(this.usersService, currentUser);
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('products/:name')
  @Render('products-item.ejs')
  getProductsPage(@Param('name') name: string, @Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getProductsPageData(
      name,
      currentUser,
      this.productService,
      this.usersService
    );
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('product-comments/:productName')
  @Render('product-comment.ejs')
  findAllByProduct(@Param('productName') productName: string, @Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getProductCommentsPageData(
      productName,
      currentUser,
      this.productService,
      this.usersService
    );
  }

  @UseGuards(JwtAuthWithoutExceptionsGuard)
  @Get('cart')
  @Render('sell-cart/sell-cart.ejs')
  getCartPage(@Req() request) {
    const currentUser = { ...request.user };

    return this.mainService.getCartPageData(
      currentUser,
      this.cartService,
      this.usersService,
    );
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  @Render('admin/index.ejs')
  getAdminPage(@Req() request) {
    return {};
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Get('admin/users-create')
  @Render('admin/users/users-create.ejs')
  getAdminUsersCreatePage(@Req() request) {
    return {};
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Get('admin/products-create')
  @Render('admin/products/products-create.ejs')
  getAdminProductsPage(@Req() request) {
    return {};
  }
}
