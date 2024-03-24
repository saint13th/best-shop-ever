import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// schemas
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ) { }

  async findAll(query: any): Promise<Product[]> {
    const id = query?.id || null;
    const title = query?.title || null;
    const name = query?.name || null;
    const price = query?.price || null;
    const rating = query?.rating || null;
    const image = query?.image || null;
    // TODO page, limit

    const queries = {
      ...(id ? { id } : {}),
      ...(title ? { title } : {}),
      ...(name ? { name } : {}),
      ...(price ? { price } : {}),
      ...(rating ? { rating } : {}),
      ...(image ? { image } : {})
    };

    const products = await this.productModel.find(queries);

    return products;
  }

  async findAllWithComments(query: any): Promise<Product[]> {
    const id = query?.id || null;
    const title = query?.title || null;
    const name = query?.name || null;
    const price = query?.price || null;
    const rating = query?.rating || null;
    const image = query?.image || null;

    const queries = {
      ...(id ? { id } : {}),
      ...(title ? { title } : {}),
      ...(name ? { name } : {}),
      ...(price ? { price } : {}),
      ...(rating ? { rating } : {}),
      ...(image ? { image } : {})
    };

    const products = await this.productModel.find(queries, {
      title: true,
      comments: true,
    });

    return products;
  }

  async findOneByName(name: string): Promise<{ product: Product }> {
    const product = await this.productModel.findOne({ name });

    if (!product) {
      throw new NotFoundException('Товар не найден!')
    }
    return { product };
  }
}
