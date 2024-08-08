import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoginBonus, RefreshToken, User } from 'src/enties';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'buikiet01',
      database: process.env.POSTGRES_DATABASE || 'Seed_dao_clone',
      models: [User, LoginBonus, RefreshToken],
      autoLoadModels: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
