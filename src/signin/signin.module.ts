import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SigninController],
  providers: [],
})
export class SigninModule {}
