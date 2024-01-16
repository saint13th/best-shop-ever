import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SigninController],
  providers: [],
})
export class SigninModule {}
