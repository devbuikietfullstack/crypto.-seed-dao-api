interface InitDataTelegram {
  auth_date: number;
  query_id: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    telegram_id: boolean;
    is_premium: boolean;
  };
}
