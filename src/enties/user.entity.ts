import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { LoginBonus } from './LoginBonus.entity';
import { RefreshToken } from './RefreshToken.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ unique: true, allowNull: false })
  user_id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  username: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
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
    unique: true,
    type: DataType.STRING,
  })
  telegram_id: string;

  @Default(null)
  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  last_claim: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  invite_id: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  referrer_id: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @HasMany(() => LoginBonus)
  login_bonus: LoginBonus[];

  @HasOne(() => RefreshToken)
  freshToken: RefreshToken;
}
