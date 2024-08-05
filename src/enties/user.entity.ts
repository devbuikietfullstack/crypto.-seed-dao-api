import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  HasMany,
} from 'sequelize-typescript';
import { login_bonus } from './login_bonus.entity';

@Table
export class user extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ unique: true, allowNull: false })
  user_id: string;

  @Column({
    allowNull: false,
    type: DataType.CHAR(50),
  })
  username: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(50),
  })
  first_name: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(50),
  })
  last_name: string;

  @Default(0)
  @Column({
    allowNull: false,
    type: DataType.FLOAT(10),
  })
  balance: number;

  @Column({
    allowNull: false,
    type: DataType.CHAR(50),
  })
  telegram_id: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  last_claim: string;

  @Column({
    allowNull: false,
    type: DataType.CHAR(6),
  })
  invite_id: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(6),
  })
  referrer_id: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @HasMany(() => login_bonus)
  login_bonus: login_bonus[];
}
