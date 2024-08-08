import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken, User } from 'src/enties';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    PassportModule,
    SequelizeModule.forFeature([User, RefreshToken]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'buikiet01',
    }),
  ],
})
export class AuthModule {}
