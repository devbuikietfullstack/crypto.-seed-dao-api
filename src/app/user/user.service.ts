import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InitDataTelegramDto } from 'src/dto';
import { User } from 'src/enties';
import { RefreshToken } from 'src/enties/RefreshToken.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(RefreshToken)
    private refreshTokenModel: typeof RefreshToken,
  ) {}

  async findOneAndCreate(initData: InitDataTelegramDto) {
    const user = initData.user;

    const userCreate: Partial<User> = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      telegram_id: user.telegram_id.toString(),
      invite_id: uuidv4().slice(0, 8),
      referrer_id: '',
    };

    const [userFind, created] = await this.userModel.findOrCreate({
      where: {
        telegram_id: user.telegram_id.toString(),
      },
      raw: true,
      defaults: userCreate,
    });
    let userReturn: null | User = null;
    if (created) userReturn = userFind.get({ plain: true });
    else userReturn = userFind;
    return userReturn;
  }

  async updateRefreshtoken(user_id: string, refreshToken: string) {
    const userFind = await this.refreshTokenModel.findOne({
      where: {
        user_id,
      },
    });

    let rs: any;

    if (userFind) {
      rs = await this.refreshTokenModel.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            user_id,
          },
        },
      );
    } else {
      rs = await this.refreshTokenModel.create(
        {
          refresh_token: refreshToken,
          user_id,
        },
        { raw: true },
      );
    }

    return rs;
  }

  async isValidRefreshtoken(user_id: string, refreshToken: string) {
    const userFind = await this.refreshTokenModel.findOne({
      where: {
        user_id,
        refresh_token: refreshToken,
      },
      raw: true,
    });

    console.log('userFind: ', userFind);

    return !!userFind;
  }

  async findOne({ user_id }: { user_id: string }) {
    const userReturn = await this.userModel.findOne({
      where: {
        user_id,
      },
      raw: true,
    });

    return userReturn;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
