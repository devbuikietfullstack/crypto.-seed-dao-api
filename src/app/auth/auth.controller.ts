import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/enties';
import { UserService } from '../user/user.service';
import { JwtGuards } from './guards/jwt.guard';
import { JwtRefreshGuards } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const telegramData = req.locals.telegramData;
    try {
      const user = await this.userService.findOneAndCreate(telegramData);
      const { accessToken, refreshToken } = await this.renderToken(user);
      await this.userService.updateRefreshtoken(user.user_id, refreshToken);
      return res.status(HttpStatus.OK).json({
        data: {
          accessToken,
          refreshToken,
          user: user,
        },
      });
    } catch (error) {
      console.log('\n =>>>>>>>>>>>>>>>>>>>>> error: ', error);
      throw new HttpException(
        error?.message || 'Error Server!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/refresh-token')
  @UseGuards(JwtRefreshGuards)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const userRefresh = await this.userService.findOne({
      user_id: user.user_id,
    });
    let refresh_token = '';
    if (Object.keys(req.user).includes('refresh_token')) {
      refresh_token = req.user['refresh_token'];
    }
    try {
      const isValid = await this.userService.isValidRefreshtoken(
        user.user_id,
        refresh_token,
      );
      console.log('isValid', isValid);

      if (!isValid) {
        throw new HttpException('Token invalid', 401);
      }

      const { accessToken, refreshToken } = await this.renderToken(userRefresh);
      await this.userService.updateRefreshtoken(
        userRefresh.user_id,
        refreshToken,
      );
      return res.status(HttpStatus.OK).json({
        data: {
          accessToken,
          refreshToken,
          user: userRefresh,
        },
      });
    } catch (error) {
      console.log('\n =>>>>>>>>>>>>>>>>>>>>> error: ', error);
      throw new HttpException(
        error?.message || 'Error Server!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/profile')
  @UseGuards(JwtGuards)
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const user: Partial<User> = req.user;
    return res.status(HttpStatus.OK).json(user);
  }

  async renderToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: '20m',
      }),
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: '30m',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
