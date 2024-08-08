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
import { User } from './User.entity';

@Table
export class LoginBonus extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  user_id: string;

  @PrimaryKey
  @Default(DataType.DATEONLY)
  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  date: string;

  @BelongsTo(() => User, 'user_id')
  user: User;
}
