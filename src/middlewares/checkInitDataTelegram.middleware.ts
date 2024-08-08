import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as CryptoJS from 'crypto-js';
import { getInitDataFromUrl } from 'src/untils';

@Injectable()
export class CheckInitDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    const tgInitData = req.headers.initdata || '';
    const initData = getInitDataFromUrl(tgInitData.toString());

    const hashFromClient = initData.get('hash');
    const dataToCheck: string[] = [];

    initData.sort();
    initData.forEach(
      (v, k) =>
        k !== 'hash' && !k.startsWith('tg') && dataToCheck.push(`${k}=${v}`),
    );

    // Parse Object
    const telegramData = dataToCheck.reduce((acc, item) => {
      const [key, value] = item.split('=');

      try {
        acc[key] = JSON.parse(value);
      } catch (e) {
        acc[key] = value;
      }

      return acc;
    }, {}) as InitDataTelegram;

    const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, 'WebAppData');

    const signature = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret);
    const referenceHash = signature.toString(CryptoJS.enc.Hex);
    if (hashFromClient === referenceHash) {
      req.locals = {
        telegramData: {
          auth_date: telegramData.auth_date,
          query_id: telegramData.query_id,
          user: {
            telegram_id: telegramData.user.id,
            first_name: telegramData.user.first_name,
            last_name: telegramData.user.last_name,
            is_premium: telegramData.user?.is_premium || false,
            user_id: telegramData.user.username,
            username: telegramData.user.username,
          },
        },
      };
      return next();
    }
    throw new UnauthorizedException('Invalid init data');
  }
}
