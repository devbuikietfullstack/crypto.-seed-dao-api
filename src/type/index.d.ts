import { InitDataTelegramDto } from 'src/dto';

declare global {
  namespace Express {
    interface Request {
      locals: {
        telegramData: InitDataTelegramDto;
      };
    }
  }
}
