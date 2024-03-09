import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MainService {

  getUser = async (username, usersService: UsersService,) => {
    let user = null;

    if (username) {
      const { name, email, image, roles } = await usersService.findByEmail(username);
      
      user = { name, email, image, roles }
    }

    return user;
  }

  async getMainPageData(
    usersService: UsersService,
    productService: ProductsService,
    query = '',
    currentUser = null
  ) {
    const user = await this.getUser(currentUser?.username, usersService);
    const products = await productService.findAll(query);

    return { products, user };
  }

  getSignInPageData = async (usersService: UsersService, currentUser = null) => {
    const user = await this.getUser(currentUser?.username, usersService);

    return { isSignIn: true, isSignUp: false, type: 'signin', user };
  }

  getSignUpPageData = async (usersService: UsersService, currentUser = null) => {
    const user = await this.getUser(currentUser?.username, usersService);

    return { isSignIn: false, isSignUp: true, type: 'signup', user };
  }

  async getCartPageData(
    currentUser = null,
    cartService: CartService,
    usersService: UsersService,
  ) {
    if (!currentUser?.userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const user = await this.getUser(currentUser?.username, usersService);
    const { cart } = await cartService.getCart(currentUser?.userId);
    const itemsCount = cart?.products.length;
    const totalPrice = cart?.products.reduce((a, b) => a + b.price, 0)

    return { cart, itemsCount, totalPrice, user };
  }

  async getProductCommentsPageData(
    productName: string,
    currentUser = null,
    productService: ProductsService,
    usersService: UsersService,
  ) {
    const user = await this.getUser(currentUser?.username, usersService);
    const result = await productService.findAll({ name: productName });

    return {
      productName,
      productTitle: result.at(0).title,
      comments: result.at(0).comments,
      user
    }
  }

  async getProductsPageData(
    name: string,
    currentUser = null,
    productService: ProductsService,
    usersService: UsersService,
  ) {
    const user = await this.getUser(currentUser?.username, usersService);
    const result = await productService.findOneByName(name);

    return { ...result, user };
  }
}
