import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class MainService {
  async getData(userService: UsersService, productService: ProductsService) {
    const products = await productService.findAll({});
    
    return { products };
  }
}
