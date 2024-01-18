import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// dto
import { UpdateProductDto } from './dto/update-product.dto';
// schemas
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ) { }

  async create(product: Product): Promise<Product> {
    const result = await this.productModel.create(product);

    return result;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();

    return products;
  }

  async findOne(name: string): Promise<{ product: Product }> {
    const product = await this.productModel.findOne({ name });

    if (!product) {
      throw new NotFoundException('Товар не найден!')
    }
    return { product };
  }

  async update(id: string, product: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true
    });
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
