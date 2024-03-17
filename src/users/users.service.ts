import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
// dto
import { UpdateUserDto } from '../admin/dto/update-user.dto';
// schemas
import { User, UserRole } from './schemas/user.schema';
import { SignupDto } from '../auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) { }

  async signUp(user: SignupDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    const result = await this.userModel.create({
      ...user,
      password: hash,
      roles: [UserRole.USER],
      name: '',
      image: '',
    });

    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({}, {
      roles: true, name: true, email: true, image: true
    });

    if (!users) {
      throw new NotFoundException('Пользователи не найдены!')
    }

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }
    return user;
  }

  async update(id: string, user: UpdateUserDto) {
    // TODO only own
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    });
  }

  async remove(id: string) {
    // TODO only own
    return this.userModel.findByIdAndDelete(id);
  }
}
