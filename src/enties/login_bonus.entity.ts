import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { user } from './user.entity';

@Table
export class login_bonus extends Model {
  @PrimaryKey
  @ForeignKey(() => user)
  @Column
  user_id: string;

  @PrimaryKey
  @Default(DataType.DATEONLY)
  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  date: string;

  @BelongsTo(() => user, 'user_id')
  user: user;
}
