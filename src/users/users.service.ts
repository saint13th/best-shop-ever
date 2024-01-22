import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
// dto
import { UpdateUserDto } from '../admin/dto/update-user.dto';
// schemas
import { User, UserRole } from './schemas/user.schema';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ){}

  async signUp(user: SignupDto): Promise<User> {
    const result = await this.userModel.create({
      ...user,
      role: [UserRole.USER],
      name: '',
      image: '',
    });

    return result;
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
