import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken, User } from 'src/enties';

@Module({
  imports: [SequelizeModule.forFeature([User, RefreshToken])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
