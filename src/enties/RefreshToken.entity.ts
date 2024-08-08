import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './User.entity';

@Table
export class RefreshToken extends Model {
  @PrimaryKey
  @Column({ type: DataType.TEXT('long'), unique: true, allowNull: false })
  refresh_token: string;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  user_id: string;

  @HasOne(() => User, 'user_id')
  user: User;
}
