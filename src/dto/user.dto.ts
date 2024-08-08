import { IsOptional } from 'class-validator';

export class UserTelegramDto {
  @IsOptional()
  user_id: string;

  @IsOptional()
  username: string;

  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  telegram_id: number;

  @IsOptional()
  is_premium: boolean;
}

export class InitDataTelegramDto {
  @IsOptional()
  auth_date: number;

  @IsOptional()
  query_id: string;

  @IsOptional()
  user: UserTelegramDto;
}
