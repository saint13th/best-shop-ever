import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class MainService {
  async getMainPageData(productService: ProductsService) {
    const products = await productService.findAll({});

    return { products };
  }

  async getCartPageData(cartService: CartService) {
    const userId = '65aaa68952cc08569f2be370'; // TODO: session userId

    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }

    const { cart } = await cartService.getCart();
    const itemsCount = cart?.products.length;
    const totalPrice = cart?.products.reduce((a, b) => a + b.price, 0)

    return { cart, itemsCount, totalPrice };
  }

  async getProductCommentsPageData(productName: string, productService: ProductsService) {
    const result = await productService.findAll({ name: productName });

    return {
      productName,
      productTitle: result.at(0).title,
      comments: result.at(0).comments
    }
  }

  async getProductsPageData(name: string, productService: ProductsService): Promise<{ product: Product }> {
    const result = await productService.findOneByName(name);
    
    return result;
  }
}
