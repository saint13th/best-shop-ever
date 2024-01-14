import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class MainService {
  async getData(userService: UserService, productService: ProductService) {
    const products = await productService.findAll();
    
    return { products };
  }
}
