import mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Product } from '../products/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,

        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const result = await this.userModel.create(createUserDto);

        return result
    }

    async findAllUsers(query: any): Promise<User[]> {
        const id = query?.id || null;
        const name = query?.name || null;
        const email = query?.email || null;
        const image = query?.image || null;
        const queries = {
            ...(id ? { id } : {}),
            ...(name ? { name } : {}),
            ...(email ? { email } : {}),
            ...(image ? { image } : {})
        };

        const users = await this.userModel.find(queries);

        if (!users.length) {
            throw new NotFoundException('Пользователь не найден!')
        }

        return users;
    }

    async updateUser(id: string, user: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true
        });
    }

    async removeUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    async createProduct(createProductDto: CreateProductDto) {
        const result = await this.productModel.create(createProductDto);

        return result
    }

    async updateProduct(id: string, product: UpdateProductDto) {
        return await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true
        });
    }

    async removeProduct(id: string) {
        return await this.productModel.findByIdAndDelete(id);
    }
}
