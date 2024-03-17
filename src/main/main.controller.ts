import { Controller, Get, Param, Query, Render, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthWithoutExceptionsGuard } from '../auth/guards/jwt-auth-without-exceptions.guard';
import { UserRole } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ChatService } from '../chat/chat.service';


@ApiTags('main (pages)')
@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly productService: ProductsService,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('admin')
  @Render('admin/index.ejs')
  async getAdminPage(@Req() request) {
    const currentUser = { ...request.user };
    const user = await this.mainService.getUser(currentUser?.username, this.usersService);

    return { user };
  }

  @Get('admin/users-create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/users/users-create.ejs')
  async getAdminUsersCreatePage(@Req() request) {
    const currentUser = { ...request.user };
    const user = await this.mainService.getUser(currentUser?.username, this.usersService);

    return { user };
  }

  @Get('admin/users/edit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/users/users-edit.ejs')
  async getAdminUsersEditPage(@Req() request) {
    const currentUser = { ...request.user };
    const { user, users } = await this.mainService.getAdminUsersEditPageData(
      currentUser, this.usersService
    );

    return { user, users };
  }

  @Get('admin/products-create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/products/products-create.ejs')
  async getAdminProductsCreatePage(@Req() request) {
    const currentUser = { ...request.user };
    const user = await this.mainService.getUser(currentUser?.username, this.usersService);

    return { user };
  }

  @Get('admin/products/edit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/products/products-edit.ejs')
  async getAdminProductsEditPage(@Req() request) {
    const currentUser = { ...request.user };
    const { user, products } = await this.mainService.getAdminProductsEditPageData(
      currentUser, this.productService, this.usersService
    );

    return { user, products };
  }

  @Get('admin/comments/edit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/comments/comments-edit.ejs')
  async getAdminCommentsEditPage(@Req() request) {
    const currentUser = { ...request.user };
    const { user, products } = await this.mainService.getAdminCommentsEditPageData(
      currentUser, this.productService, this.usersService
    );

    return { user, products };
  }

  @Get('admin/chats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Render('admin/chats/chats.ejs')
  async getAdminChatsPage(@Req() request, @Query() query) {
    const currentUser = { ...request.user };
    const user = await this.mainService.getUser(currentUser?.username, this.usersService);
    const chat = await this.chatService.findChatMessages(query.room);
    const chats = await this.chatService.findAllChats();

    return { user, messages: chat?.messages, chats };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('messenger')
  @Render('messenger/messenger.ejs')
  async getMessengerPage(@Req() request) {
    const currentUser = { ...request.user };
    const user = await this.mainService.getUser(currentUser?.username, this.usersService);
    const chat = await this.chatService.findChatMessages(currentUser.username);

    return { user, messages: chat?.messages };
  }
}
