import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
// dto
import { UpdateUserDto } from './dto/update-user.dto';
// schemas
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ){}

  async create(user: User): Promise<User> {
    const result = await this.userModel.create(user);

    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }
    return user;
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
