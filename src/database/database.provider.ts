import { Sequelize } from 'sequelize-typescript';
import { login_bonus, user } from 'src/enties';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'buikiet01',
        database: process.env.POSTGRES_DATABASE || 'Seed_dao_clone',
      });
      sequelize.addModels([user, login_bonus]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
